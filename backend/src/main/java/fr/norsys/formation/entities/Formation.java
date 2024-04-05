package fr.norsys.formation.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "formation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_formation;
    @NotBlank
    private String titre;
    @NotBlank
    private String description;
    private Date dateDebut;
    private Date dateFin;

    @ManyToMany
    @JoinTable(
        name = "formation_adherent",
        joinColumns = @JoinColumn(name = "formation_id"),
        inverseJoinColumns = @JoinColumn(name = "adherent_id")
    )
    private Set<Adherent> adherents = new HashSet<>();
}