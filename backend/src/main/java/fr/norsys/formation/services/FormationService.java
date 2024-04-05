package fr.norsys.formation.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.norsys.formation.dao.AdherentRepository;
import fr.norsys.formation.dao.AffectationRepository;
import fr.norsys.formation.dao.FormationRepository;
import fr.norsys.formation.entities.User;
import fr.norsys.formation.entities.Loan;
import fr.norsys.formation.entities.Book;
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

    public List<Book> getAllFormations() {
        return formationRepository.findAll();
    }

    public Optional<Book> getFormationById(Long id) {
        return formationRepository.findById(id);
    }

    public Book createFormation(Book formation) {
        return formationRepository.save(formation);
    }
    public Loan createAffectation(Loan affectation) {
        return affectationRepository.save(affectation);
    }

    public Book updateFormation(Long id, Book updatedFormation) {
        return formationRepository.findById(id).map(formation -> {
            formation.setTitle(updatedFormation.getTitle());
            formation.setSummary(updatedFormation.getSummary());
            formation.setType(updatedFormation.getType());
            formation.setDate_publish(updatedFormation.getDate_publish());
            formation.setQuantity(updatedFormation.getQuantity());
            return formationRepository.save(formation);
        }).orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + id));
    }

    public void deleteFormation(Long id) {
        formationRepository.deleteById(id);
    }

    // Methods for adherents

    public List<User> getAllAdherents() {
        return adherentRepository.findAll();
    }

    public Optional<User> getAdherentById(Long id) {
        return adherentRepository.findById(id);
    }

    public User createAdherent(User adherent) {
        return adherentRepository.save(adherent);
    }

    public User updateAdherent(Long id, User updatedAdherent) {
        return adherentRepository.findById(id).map(adherent -> {
            adherent.setNom(updatedAdherent.getNom());
            adherent.setPrenom(updatedAdherent.getPrenom());
            adherent.setDate_naissance(updatedAdherent.getDate_naissance());
            adherent.setTel(updatedAdherent.getTel());
            return adherentRepository.save(adherent);
        }).orElseThrow(() -> new ResourceNotFoundException("Adherent not found with ID: " + id));
    }

    public Loan updateLoan(Long id, Loan updatedAdherent) {
        return affectationRepository.findById(id).map(adherent -> {
            adherent.setBook_id(updatedAdherent.getBook_id());
            adherent.setLoan_id(updatedAdherent.getLoan_id());
            adherent.setStartDate(updatedAdherent.getStartDate());
            adherent.setEndDate(updatedAdherent.getEndDate());
            return affectationRepository.save(adherent);
        }).orElseThrow(() -> new ResourceNotFoundException("Loan not found with ID: " + id));
    }

    public void deleteAdherent(Long id) {
        adherentRepository.deleteById(id);
    }

    public List<Loan> getAllAffectations() {
        return affectationRepository.findAll();
    }

    public void deleteAffectation(long id) {
        affectationRepository.deleteById(id);
    }
}