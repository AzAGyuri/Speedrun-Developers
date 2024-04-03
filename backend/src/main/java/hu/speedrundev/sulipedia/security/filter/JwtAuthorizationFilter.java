package hu.speedrundev.sulipedia.security.filter;

import hu.speedrundev.sulipedia.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

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

      //extract token, then username from token
      String token = authorizationHeader.substring("Bearer".length()).trim();
      System.out.println(token);
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
    }

    //at the end, perform a filtering
    filterChain.doFilter(request, response);
  }
}
