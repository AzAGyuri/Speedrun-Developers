package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.dto.user.UserLogin;
import hu.speedrundev.sulipedia.dto.user.UserRegistration;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

  @Autowired
  private UserRepository repository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Autowired
  private JwtUtil jwtUtil;

  public GetUserWithID login(UserLogin user) {
    if (user == null) throw nullPointer();

    Optional<User> potentialLogin = repository.findByEmail(
      user.getUsernameOrEmail()
    );

    if (potentialLogin.isEmpty()) potentialLogin =
      repository.findByUsername(user.getUsernameOrEmail());

    if (potentialLogin.isEmpty()) throw modelNotFound(
      "USERNAME_OR_EMAIL_NOT_FOUND"
    );

    User possibleLogin = potentialLogin.get();

    if (
      possibleLogin.getDeleted() != null && possibleLogin.getDeleted()
    ) throw itsGoneBud("USER_HAS_BEEN_DELETED");

    if (
      !passwordEncoder.matches(
        user.getPasswordRaw(),
        possibleLogin.getUserPassword()
      )
    ) throw unauthorized("PROVIDED_PASSWORD_DOES_NOT_MATCH_FOR_USERNAME");

    possibleLogin.setLastLogin(LocalDateTime.now());

    return new GetUserWithID(repository.save(possibleLogin));
  }

  public GetUserWithID register(UserRegistration registrationInfo) {
    if (registrationInfo == null) throw nullPointer();

    if (
      repository.existsUserByEmail(registrationInfo.getEmail())
    ) throw notUnique("USER_EMAIL_ALREADY_TAKEN");

    if (registrationInfo.isAnyRequiredNull()) throw badRequest(
      "SOME_REQUIRED_INPUT_DATA_IS_NULL"
    );

    if (registrationInfo.isAnyRequiredEmpty()) throw badRequest(
      "SOME_REQUIRED_INPUT_DATA_IS_EMPTY"
    );

    if (registrationInfo.invalidPassword()) throw badRequest(
      "INPUT_PASSWORD_IS_INVALID"
    );

    registrationInfo.setPasswordRaw(
      passwordEncoder.encode(registrationInfo.getPasswordRaw())
    );

    return new GetUserWithID(repository.save(new User(registrationInfo)));
  }

  public boolean logout(String token) {
    if (token == null) throw nullPointer();

    String username = jwtUtil.getSubject(token);

    if (!repository.existsUserByUsername(username)) throw modelNotFound(
      "USER_NOT_FOUND"
    );

    User logout = repository.getByUsername(username);
    logout.setLastLogoff(LocalDateTime.now());
    repository.save(logout);

    return true;
  }

  public boolean isJWTValid(String token) {
    return !jwtUtil.isTokenExpired(token);
  }
}
