package fr.norsys.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.norsys.formation.entities.Formation;

public interface FormationRepository extends JpaRepository<Formation, Long> {
}
