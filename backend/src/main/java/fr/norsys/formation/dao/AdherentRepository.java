package fr.norsys.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.norsys.formation.entities.User;

public interface AdherentRepository extends JpaRepository<User, Long> {
}