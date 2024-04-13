package hu.speedrundev.sulipedia.security.filter;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.speedrundev.sulipedia.dto.ExceptionResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

  public final String FORBIDDEN_MESSAGE =
    "You do not have permission to access this page";

  @Override
  public void handle(
    HttpServletRequest request,
    HttpServletResponse response,
    AccessDeniedException accessDeniedException
  ) throws IOException, ServletException {
    ExceptionResponse exceptionResponse = new ExceptionResponse(
      new Date(),
      FORBIDDEN.value(),
      FORBIDDEN.getReasonPhrase(),
      FORBIDDEN_MESSAGE,
      request.getServletPath()
    ); //response exeption creation

    //setup servlet response
    response.setContentType(APPLICATION_JSON_VALUE);
    response.setStatus(UNAUTHORIZED.value());

    //output setup
    OutputStream output = response.getOutputStream(); //get response's output stream
    new ObjectMapper().writeValue(output, exceptionResponse); //map the exception output into JSON and write it onto the output stream

    output.flush(); //flush/write/send exception
  }
}
