package hu.speedrundev.sulipedia.util;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private SecretKey KEY;

  private static final long EXPIRATION_TIME = 30l * 24l * 60l * 60l * 1000l;

  private final JwtParser parser;

  public JwtUtil(@Value("${sulipedia.secret}") String secret) {
    this.KEY = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.parser = Jwts.parser().verifyWith(KEY).build();
  }

  public String generateToken(String username, String[] authorities) {
    return Jwts
      .builder()
      .audience()
      .add("https://sulipedia.duckdns.org/")
      .and()
      .subject(username)
      .claim("authorities", authorities)
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
      .signWith(KEY, Jwts.SIG.HS512)
      .compact();
  }

  public String getSubject(String token) {
    return parser.parseSignedClaims(token).getPayload().getSubject();
  }

  public boolean isTokenValid(String username, String token) {
    return username != null && !username.isBlank() && !isTokenExpired(token);
  }

  public boolean isTokenExpired(String token) {
    return parser
      .parseSignedClaims(token)
      .getPayload()
      .getExpiration()
      .before(new Date());
  }

  public List<GrantedAuthority> getAuthorities(String token) {
    @SuppressWarnings("unchecked")
    ArrayList<String> authorities = parser
      .parseSignedClaims(token)
      .getPayload()
      .get("authorities", ArrayList.class);

    return authorities
      .stream()
      .map(SimpleGrantedAuthority::new)
      .collect(Collectors.toList());
  }

  public Authentication getAuthentication(
    String username,
    List<GrantedAuthority> authorities,
    HttpServletRequest request
  ) {
    UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(
      username,
      null,
      authorities
    );
    upat.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    return upat;
  }

  public String extractClaim(String claim, String token) {
    return String.valueOf(
      parser.parseSignedClaims(token).getPayload().get(claim)
    );
  }
}
