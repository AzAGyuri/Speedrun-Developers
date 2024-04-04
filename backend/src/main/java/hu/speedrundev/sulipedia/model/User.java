package hu.speedrundev.sulipedia.model;

import hu.speedrundev.sulipedia.dto.user.PostUser;
import hu.speedrundev.sulipedia.dto.user.UpdateUser;
import hu.speedrundev.sulipedia.dto.user.UserRegistration;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "registered_users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private Date createdOn;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false)
  private String userPassword;

  @Email(
    regexp = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
  )
  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = true)
  private String nickname;

  @Column(nullable = true)
  private String phoneNumber;

  @Column(nullable = true)
  private Date birthDate;

  @Column(nullable = true)
  private Boolean deleted;

  @Column(nullable = true)
  private Date deletedOn;

  @Column(nullable = true)
  private Date lastLogin;

  @Column(nullable = true)
  private Date lastLogoff;

  @Lob
  @Column(nullable = true)
  private byte[] profilePicture;

  @OneToMany(mappedBy = "author", orphanRemoval = false)
  private List<Entry> entries;

  @OneToMany(mappedBy = "linkedUser", orphanRemoval = true)
  private List<Availability> availabilities;

  @ElementCollection(targetClass = Roles.class, fetch = FetchType.EAGER)
  @CollectionTable(
    name = "user_roles",
    joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
  )
  @Enumerated(EnumType.STRING)
  @Column(name = "role_id")
  private Set<Roles> roles;

  @ManyToOne
  @JoinColumn(name = "class_id")
  private SchoolClass linkedClass;

  @OneToMany(mappedBy = "author")
  private List<Comment> createdComments;

  public User(PostUser user) {
    createdOn = Date.from(Instant.now());
    email = user.getEmail();
    userPassword = user.getPasswordRaw();
    username = user.getUserName();
    roles.add(Roles.ROLE_STUDENT);
  }

  public User(UserRegistration user) {
    createdOn = Date.from(Instant.now());
    email = user.getEmail();
    userPassword = user.getPasswordRaw();
    username = user.getUserName();
    roles.add(Roles.ROLE_STUDENT);
    nickname = user.getNickname();
    phoneNumber = user.getPhoneNumber();
  }

  public void nulledDelete() {
    availabilities = null;
    birthDate = Date.from(Instant.EPOCH);
    deleted = true;
    deletedOn = Date.from(Instant.now());
    email = "";
    entries = null;
    userPassword = "";
    username = "deleted_user: " + id;
  }

  public boolean isAllUnchanged(UpdateUser changes) {
    return (
      this.username.equals(changes.getUserName()) &&
      this.userPassword.equals(
          new BCryptPasswordEncoder().encode(changes.getPassword())
        ) &&
      this.email.equals(changes.getEmail())
    );
  }

  public boolean isAllUnchanged(User updatingUser) {
    return (
      this.username.equals(updatingUser.getUsername()) &&
      this.userPassword.equals(updatingUser.getUserPassword()) &&
      this.email.equals(updatingUser.getEmail())
    );
  }
}
