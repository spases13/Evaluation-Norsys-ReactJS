package fr.norsys.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.norsys.formation.entities.Affectation;

public interface AffectationRepository extends JpaRepository<Affectation, Long> {
}