package hu.speedrundev.sulipedia.config;

import static org.springframework.security.config.Customizer.withDefaults;

import hu.speedrundev.sulipedia.security.filter.JwtAccessDeniedHandler;
import hu.speedrundev.sulipedia.security.filter.JwtAuthenticationEntryPoint;
import hu.speedrundev.sulipedia.security.filter.JwtAuthorizationFilter;
import jakarta.servlet.DispatcherType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

  @Autowired
  private UserDetailsService service;

  @Autowired
  private JwtAuthorizationFilter jwtAuthorizationFilter;

  @Autowired
  private JwtAccessDeniedHandler jwtAccessDeniedHandler;

  @Autowired
  private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  private static final String[] PUBLIC_URLS = {
    "/login",
    "/register",
    "/swagger-ui/**",
    "/swagger-resources/**",
    "/v2/api-docs",
    "/v3/api-docs/**",
  };

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(CsrfConfigurer::disable)
      .authorizeHttpRequests(request ->
        request
          .dispatcherTypeMatchers(DispatcherType.FORWARD, DispatcherType.ERROR)
          .permitAll()
          .requestMatchers(PUBLIC_URLS)
          .permitAll()
          .requestMatchers(HttpMethod.PATCH, "/user/{id}")
          .hasAuthority("ROLE_ADMIN")
          .anyRequest()
          .authenticated()
      )
      .httpBasic(withDefaults())
      .formLogin(FormLoginConfigurer::disable)
      .exceptionHandling(exception ->
        exception
          .authenticationEntryPoint(jwtAuthenticationEntryPoint)
          .accessDeniedHandler(jwtAccessDeniedHandler)
      )
      .authenticationManager(getAuthenticationManager(http))
      .sessionManagement(sess ->
        sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .addFilterBefore(
        jwtAuthorizationFilter,
        UsernamePasswordAuthenticationFilter.class
      );
    return http.build();
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth)
    throws Exception {
    auth.userDetailsService(service).passwordEncoder(bCryptPasswordEncoder);
  }

  @Bean
  public AuthenticationManager getAuthenticationManager(HttpSecurity http)
    throws Exception {
    AuthenticationManagerBuilder amb = http.getSharedObject(
      AuthenticationManagerBuilder.class
    );
    amb.userDetailsService(service);
    return amb.build();
  }
}
