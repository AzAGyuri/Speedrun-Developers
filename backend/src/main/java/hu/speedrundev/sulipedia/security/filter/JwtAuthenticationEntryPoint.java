package hu.speedrundev.sulipedia.security.filter;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.speedrundev.sulipedia.dto.ExceptionResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint extends Http403ForbiddenEntryPoint {

  private static final String UNAUTHORIZED_MESSAGE =
    "You need to log in to access this page";

  @Override
  public void commence(
    HttpServletRequest request,
    HttpServletResponse response,
    AuthenticationException authenticationException
  ) throws IOException {
    ExceptionResponse exceptionResponse = new ExceptionResponse(
      new Date(),
      UNAUTHORIZED.value(),
      UNAUTHORIZED.getReasonPhrase(),
      UNAUTHORIZED_MESSAGE,
      request.getServletPath()
    );

    response.setContentType(APPLICATION_JSON_VALUE);
    response.setStatus(FORBIDDEN.value());

    OutputStream output = response.getOutputStream();
    new ObjectMapper().writeValue(output, exceptionResponse);

    output.flush();
  }
}
