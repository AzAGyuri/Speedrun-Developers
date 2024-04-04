package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.dto.user.UserLogin;
import hu.speedrundev.sulipedia.dto.user.UserRegistration;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;
import java.util.Date;
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

    possibleLogin.setLastLogin(new Date());

    return new GetUserWithID(repository.save(possibleLogin));
  }

  public GetUserWithID register(UserRegistration registrationInfo) {
    if (registrationInfo == null) throw nullPointer();
    if (
      repository.existsUserByUsername(registrationInfo.getUsername()) &&
      repository.existsUserByEmail(registrationInfo.getEmail())
    ) throw notUnique("USERNAME_ALREADY_TAKEN");

    registrationInfo.setPasswordRaw(
      passwordEncoder.encode(registrationInfo.getPasswordRaw())
    );

    return new GetUserWithID(repository.save(new User(registrationInfo)));
  }

  public boolean logout(String jwtToken) {
    if (jwtToken == null) throw nullPointer();

    String username = jwtUtil.getSubject(jwtToken);

    if (!repository.existsUserByUsername(username)) throw modelNotFound(
      "USER_NOT_FOUND"
    );

    User logout = repository.getByUsername(username);
    logout.setLastLogoff(new Date());
    repository.save(logout);

    return true;
  }

  public boolean isJWTValid(String jwtToken) {
    return !jwtUtil.isTokenExpired(jwtToken);
  }
}
