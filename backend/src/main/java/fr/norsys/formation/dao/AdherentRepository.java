package fr.norsys.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.norsys.formation.entities.Adherent;

public interface AdherentRepository extends JpaRepository<Adherent, Long> {
}