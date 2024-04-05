package fr.norsys.formation.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fr.norsys.formation.entities.User;
import fr.norsys.formation.entities.Affectation;
import fr.norsys.formation.entities.Book;
import fr.norsys.formation.exceptions.ResourceNotFoundException;
import fr.norsys.formation.services.FormationService;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/bookloans")
public class FormationController {

    @Autowired
    private FormationService formationService;

    @GetMapping("")
    public ResponseEntity<List<Book>> getAllFormations() {
        List<Book> formations = formationService.getAllFormations();
        return new ResponseEntity<>(formations, HttpStatus.OK);
    }

    @GetMapping("/affectations")
    public ResponseEntity<List<Affectation>> getAllAffectations() {
        List<Affectation> affectations = formationService.getAllAffectations();
        return new ResponseEntity<>(affectations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getFormationById(@PathVariable("id") long id) {
        Optional<Book> formationOptional = formationService.getFormationById(id);
        return formationOptional
                .map(formation -> new ResponseEntity<>(formation, HttpStatus.OK))
                .orElseThrow(() -> new ResourceNotFoundException("Formation not found with ID: " + id));
    }

    @PostMapping("")
    public ResponseEntity<Book> createFormation(@Valid @RequestBody Book formation) {
        Book createdFormation = formationService.createFormation(formation);
        return new ResponseEntity<>(createdFormation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateFormation(@PathVariable("id") long id, @Valid @RequestBody Book formation) {
        Book updatedFormation = formationService.updateFormation(id, formation);
        return updatedFormation != null ? new ResponseEntity<>(updatedFormation, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable("id") long id) {
        formationService.deleteFormation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/adherents")
    public ResponseEntity<List<User>> getAllAdherents() {
        List<User> adherents = formationService.getAllAdherents();
        return new ResponseEntity<>(adherents, HttpStatus.OK);
    }

    @GetMapping("/adherents/{id}")
    public ResponseEntity<User> getAdherentById(@PathVariable("id") long id) {
        Optional<User> adherentOptional = formationService.getAdherentById(id);
        return adherentOptional
                .map(adherent -> new ResponseEntity<>(adherent, HttpStatus.OK))
                .orElseThrow(() -> new ResourceNotFoundException("Adherent not found with ID: " + id));
    }

    @PostMapping("/adherents")
    public ResponseEntity<User> createAdherent(@Valid @RequestBody User adherent) {
        User createdAdherent = formationService.createAdherent(adherent);
        return new ResponseEntity<>(createdAdherent, HttpStatus.CREATED);
    }

    @PostMapping("/affectations")
    public ResponseEntity<Affectation> createAffectation(@Valid @RequestBody Affectation adherent) {
        Affectation createdAdherent = formationService.createAffectation(adherent);
        return new ResponseEntity<>(createdAdherent, HttpStatus.CREATED);
    }

    @PutMapping("/adherents/{id}")
    public ResponseEntity<User> updateAdherent(@PathVariable("id") long id, @Valid @RequestBody User adherent) {
        User updatedAdherent = formationService.updateAdherent(id, adherent);
        return updatedAdherent != null ? new ResponseEntity<>(updatedAdherent, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/adherents/{id}")
    public ResponseEntity<Void> deleteAdherent(@PathVariable("id") long id) {
        formationService.deleteAdherent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/affectations/{id}")
    public ResponseEntity<Void> deleteAffectation(@PathVariable("id") long id) {
        formationService.deleteAffectation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}