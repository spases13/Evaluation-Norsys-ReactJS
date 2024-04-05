package fr.norsys.formation.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.norsys.formation.dao.AdherentRepository;
import fr.norsys.formation.dao.AffectationRepository;
import fr.norsys.formation.dao.FormationRepository;
import fr.norsys.formation.entities.Adherent;
import fr.norsys.formation.entities.Affectation;
import fr.norsys.formation.entities.Formation;
import fr.norsys.formation.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class FormationService {

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private AdherentRepository adherentRepository;

    @Autowired
    private AffectationRepository affectationRepository;

    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }

    public Optional<Formation> getFormationById(Long id) {
        return formationRepository.findById(id);
    }

    public Formation createFormation(Formation formation) {
        return formationRepository.save(formation);
    }
    public Affectation createAffectation(Affectation affectation) {
        return affectationRepository.save(affectation);
    }

    public Formation updateFormation(Long id, Formation updatedFormation) {
        return formationRepository.findById(id).map(formation -> {
            formation.setTitre(updatedFormation.getTitre());
            formation.setDescription(updatedFormation.getDescription());
            formation.setDateDebut(updatedFormation.getDateDebut());
            formation.setDateFin(updatedFormation.getDateFin());
            return formationRepository.save(formation);
        }).orElseThrow(() -> new ResourceNotFoundException("Formation not found with ID: " + id));
    }

    public void deleteFormation(Long id) {
        formationRepository.deleteById(id);
    }

    // Methods for adherents

    public List<Adherent> getAllAdherents() {
        return adherentRepository.findAll();
    }

    public Optional<Adherent> getAdherentById(Long id) {
        return adherentRepository.findById(id);
    }

    public Adherent createAdherent(Adherent adherent) {
        return adherentRepository.save(adherent);
    }

    public Adherent updateAdherent(Long id, Adherent updatedAdherent) {
        return adherentRepository.findById(id).map(adherent -> {
            adherent.setNom(updatedAdherent.getNom());
            adherent.setPrenom(updatedAdherent.getPrenom());
            adherent.setDate_inscription(updatedAdherent.getDate_inscription());
            adherent.setTel(updatedAdherent.getTel());
            return adherentRepository.save(adherent);
        }).orElseThrow(() -> new ResourceNotFoundException("Adherent not found with ID: " + id));
    }

    public void deleteAdherent(Long id) {
        adherentRepository.deleteById(id);
    }

    public List<Affectation> getAllAffectations() {
        return affectationRepository.findAll();
    }

    public void deleteAffectation(long id) {
        affectationRepository.deleteById(id);
    }
}