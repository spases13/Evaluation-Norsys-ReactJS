package fr.norsys.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.norsys.formation.entities.Loan;

public interface AffectationRepository extends JpaRepository<Loan, Long> {
}