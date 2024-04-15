package hu.speedrundev.sulipedia.model;

import static hu.speedrundev.sulipedia.util.MiscUtils.generateThreeRandomColors;

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
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
  private LocalDateTime createdOn;

  @Column(nullable = false)
  private String username;

  @Column(nullable = false)
  private String userPassword;

  @Email(regexp = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false, name = "random_avatar_bg_color")
  private String randomAvatarBgColor;

  @Column(nullable = true)
  private String nickname;

  @Column(nullable = true)
  private String phoneNumber;

  @Column(nullable = true)
  private LocalDateTime birthDate;

  @Column(nullable = true)
  private Boolean deleted;

  @Column(nullable = true)
  private LocalDateTime deletedOn;

  @Column(nullable = true)
  private LocalDateTime lastLogin;

  @Column(nullable = true)
  private LocalDateTime lastLogoff;

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

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "grouped_user",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "group_id")
  )
  private Set<Group> joinedGroups;

  @OneToMany(mappedBy = "author")
  private List<Comment> createdComments;

  public User(PostUser user) {
    createdOn = LocalDateTime.now();
    email = user.getEmail();
    userPassword = user.getPasswordRaw();
    username = user.getUsername();
    roles = new HashSet<>();
    roles.add(Roles.ROLE_STUDENT);
    nickname = user.getNickname();
    phoneNumber = user.getPhoneNumber();
    randomAvatarBgColor = generateThreeRandomColors();
  }

  public User(UserRegistration user) {
    createdOn = LocalDateTime.now();
    email = user.getEmail();
    userPassword = user.getPasswordRaw();
    username = user.getUsername();
    roles = new HashSet<>();
    roles.add(Roles.ROLE_STUDENT);
    nickname = user.getNickname();
    phoneNumber = user.getPhoneNumber();
    lastLogin = LocalDateTime.now();
    randomAvatarBgColor = generateThreeRandomColors();
  }

  public void nulledDelete() {
    availabilities = null;
    birthDate = LocalDateTime.MIN;
    deleted = true;
    deletedOn = LocalDateTime.now();
    email = "";
    entries = null;
    userPassword = "";
    username = "deleted_user: " + id;
  }

  public boolean doesAllMatch(UpdateUser changes) {
    return (
      (
        this.nickname == null
          ? false
          : this.nickname.equalsIgnoreCase(changes.getNickname())
      ) &&
      this.email.equalsIgnoreCase(changes.getEmail()) &&
      (
        this.phoneNumber == null
          ? false
          : this.phoneNumber.equalsIgnoreCase(changes.getPhoneNumber())
      )
    );
  }

  public boolean isAllUnchanged(User updatingUser) {
    return (
      (
        this.nickname == null
          ? false
          : this.nickname.equalsIgnoreCase(updatingUser.getNickname())
      ) &&
      this.userPassword.equalsIgnoreCase(updatingUser.getUserPassword()) &&
      this.email.equalsIgnoreCase(updatingUser.getEmail()) &&
      (
        this.phoneNumber == null
          ? false
          : this.phoneNumber.equalsIgnoreCase(updatingUser.getPhoneNumber())
      )
    );
  }

  public User(User referencedUser) {
    this.nickname = referencedUser.nickname;
    this.userPassword = referencedUser.userPassword;
    this.email = referencedUser.email;
    this.phoneNumber = referencedUser.phoneNumber;
  }
}
