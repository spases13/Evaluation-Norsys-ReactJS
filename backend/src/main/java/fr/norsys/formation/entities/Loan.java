package fr.norsys.formation.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name  = "book_user")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Loan {
  @Id
  @GeneratedValue
  private Long loan_id;
  private Long book_id;
  private Long user_id;
  private Date startDate;
  private Date endDate;
}