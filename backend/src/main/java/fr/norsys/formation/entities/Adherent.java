package fr.norsys.formation.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "adherent")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Adherent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_adherent;
    private String nom;
    private String prenom;
    private Date date_inscription;
    private String tel;

    // @ManyToMany(mappedBy = "adherents")
    // private Set<Formation> formations = new HashSet<>();
}