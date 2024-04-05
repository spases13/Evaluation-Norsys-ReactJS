package fr.norsys.formation.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name  = "formation_adherent")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Affectation {
  @Id
  @GeneratedValue
  private Long affectation_id;
  private Long formation_id;
  private Long adherent_id;
}