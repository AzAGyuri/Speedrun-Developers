package hu.speedrundev.sulipedia.model;

import hu.speedrundev.sulipedia.dto.group.PostGroup;
import hu.speedrundev.sulipedia.dto.group.SpecializationDto;
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
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "school_groups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group {

  public Group(PostGroup group, User creator) {
    this.groupName = group.getGroupName();
    this.descriptionContent = group.getDescriptionContent();
    this.creator = creator;
    this.specializations =
      group
        .getSpecializations()
        .stream()
        .map(SpecializationDto::toString)
        .map(Specialization::valueOf)
        .collect(Collectors.toSet());
    this.users = new ArrayList<>();
    users.add(creator);
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String groupName;

  private String descriptionContent;

  @Column(name = "random_avatar_bg_color")
  private String randomAvatarBgColor;

  @ManyToOne
  @JoinColumn(name = "creator_id")
  private User creator;

  @ElementCollection(
    targetClass = Specialization.class,
    fetch = FetchType.EAGER
  )
  @CollectionTable(
    name = "group_specialization",
    joinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id")
  )
  @Enumerated(EnumType.STRING)
  @Column(name = "specialization")
  private Set<Specialization> specializations;

  @ManyToMany(mappedBy = "joinedGroups")
  private List<User> users;
}
