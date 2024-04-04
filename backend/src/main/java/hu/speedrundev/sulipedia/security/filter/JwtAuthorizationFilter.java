package hu.speedrundev.sulipedia.security.filter;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.speedrundev.sulipedia.dto.ExceptionResponse;
import hu.speedrundev.sulipedia.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

  @Autowired
  private JwtUtil jwtUtil;

  @Override
  protected void doFilterInternal(
    @NonNull HttpServletRequest request,
    @NonNull HttpServletResponse response,
    @NonNull FilterChain filterChain
  ) throws ServletException, IOException {
    //is the request method an options
    if (request.getMethod().equalsIgnoreCase("OPTIONS")) response.setStatus(
      HttpStatus.OK.value()
    ); else {
      //find authorization header - this has JWT
      String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

      if (
        authorizationHeader == null || !authorizationHeader.startsWith("Bearer")
      ) {
        //if not found, just filter normally
        filterChain.doFilter(request, response);
        return;
      }

      try {
        //extract token, then username from token
        String token = authorizationHeader.substring("Bearer".length()).trim();
        String username = jwtUtil.getSubject(token);

        if (
          jwtUtil.isTokenValid(username, token) &&
          SecurityContextHolder.getContext().getAuthentication() == null
        ) {
          //extract authorities into list of granted authorities
          List<GrantedAuthority> authorities = jwtUtil.getAuthorities(token);

          //get authentication and set it on the security context
          Authentication authentication = jwtUtil.getAuthentication(
            username,
            authorities,
            request
          );
          SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
          SecurityContextHolder.clearContext();
        }
      } catch (ExpiredJwtException ejwte) { //catch the case where the jwt token is found to be expired
        //setup an unauthorized exception response
        ExceptionResponse exceptionResponse = new ExceptionResponse(
          new Date(),
          UNAUTHORIZED.value(),
          UNAUTHORIZED,
          UNAUTHORIZED.getReasonPhrase().toUpperCase(),
          //format the message
          formatExceptionMessage(
            ejwte.getMessage(),
            jwtUtil.extractClaim(
              "exp",
              request
                .getHeader(HttpHeaders.AUTHORIZATION)
                .substring("Bearer".length())
            )
          )
        );

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(UNAUTHORIZED.value());

        OutputStream output = response.getOutputStream();
        new ObjectMapper().writeValue(output, exceptionResponse);

        output.flush();

        //DO NOT CONTINUE FILTERING
        return;
      }
    }

    //at the end, perform a filtering
    filterChain.doFilter(request, response);
  }

  private String formatExceptionMessage(
    String message,
    String expirationString
  ) {
    Pattern pattern = Pattern.compile("[0-9]+");
    Matcher matcher = pattern.matcher(message);

    String time = "";

    if (matcher.find()) {
      time = matcher.group();
    }

    StringBuilder sb = new StringBuilder();

    sb
      .append(message.substring(0, message.indexOf(time)))
      .append("since ")
      .append(new Date(Integer.parseInt(expirationString)).toString())
      .append("!\nPlease reauthenticate!");

    return sb.toString();
  }
}
