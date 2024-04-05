package fr.norsys.formation.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long book_id;
    @NotBlank
    private String title;
    @NotBlank
    private String summary;
    @NotBlank
    private String type;
    @NotBlank
    private String author;
    private int quantity = 0;
    @NotNull
    private Date date_publish;

    @ManyToMany
    @JoinTable(
        name = "book_user",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> adherents = new HashSet<>();
}