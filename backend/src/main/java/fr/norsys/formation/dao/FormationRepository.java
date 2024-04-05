package fr.norsys.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.norsys.formation.entities.Book;

public interface FormationRepository extends JpaRepository<Book, Long> {
}
