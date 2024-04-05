package fr.norsys.formation.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name  = "book_user")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Affectation {
  @Id
  @GeneratedValue
  private Long affectation_id;
  private Long book_id;
  private Long user_id;
}