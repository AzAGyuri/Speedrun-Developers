package hu.speedrundev.sulipedia.model;

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
import jakarta.persistence.Table;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import hu.speedrundev.sulipedia.dto.group.PostGroup;
import hu.speedrundev.sulipedia.dto.group.SpecializationDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "groups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group {

  public Group(PostGroup group) {
    this.groupName = group.getGroupName();
    this.specializations =
      group
        .getSpecializations()
        .stream()
        .map(SpecializationDto::toString)
        .map(Specialization::valueOf)
        .collect(Collectors.toSet());
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String groupName;

  @ElementCollection(
    targetClass = Specialization.class,
    fetch = FetchType.EAGER
  )
  @CollectionTable(
    name = "group_specialization",
    joinColumns = @JoinColumn(
      name = "group_id",
      referencedColumnName = "id"
    )
  )
  @Enumerated(EnumType.STRING)
  @Column(name = "specialization")
  private Set<Specialization> specializations;

  @ManyToMany(mappedBy = "joinedGroups")
  private List<User> users;
}
