package fr.norsys.formation.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String nom;
    private String prenom;
    private Date date_inscription;
    private String tel;

    // @ManyToMany(mappedBy = "adherents")
    // private Set<Formation> formations = new HashSet<>();
}