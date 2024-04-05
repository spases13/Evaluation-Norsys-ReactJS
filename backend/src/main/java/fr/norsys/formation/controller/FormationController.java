package fr.norsys.formation.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fr.norsys.formation.entities.User;
import fr.norsys.formation.entities.Loan;
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

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllFormations() {
        List<Book> formations = formationService.getAllFormations();
        return new ResponseEntity<>(formations, HttpStatus.OK);
    }

    @GetMapping("/loans")
    public ResponseEntity<List<Loan>> getAllAffectations() {
        List<Loan> affectations = formationService.getAllAffectations();
        return new ResponseEntity<>(affectations, HttpStatus.OK);
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getFormationById(@PathVariable("id") long id) {
        Optional<Book> formationOptional = formationService.getFormationById(id);
        return formationOptional
                .map(formation -> new ResponseEntity<>(formation, HttpStatus.OK))
                .orElseThrow(() -> new ResourceNotFoundException("Formation not found with ID: " + id));
    }

    @PostMapping("/books")
    public ResponseEntity<Book> createFormation(@Valid @RequestBody Book formation) {
        Book createdFormation = formationService.createFormation(formation);
        return new ResponseEntity<>(createdFormation, HttpStatus.CREATED);
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateFormation(@PathVariable("id") long id, @Valid @RequestBody Book formation) {
        Book updatedFormation = formationService.updateFormation(id, formation);
        return updatedFormation != null ? new ResponseEntity<>(updatedFormation, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable("id") long id) {
        formationService.deleteFormation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllAdherents() {
        List<User> users = formationService.getAllAdherents();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getAdherentById(@PathVariable("id") long id) {
        Optional<User> adherentOptional = formationService.getAdherentById(id);
        return adherentOptional
                .map(adherent -> new ResponseEntity<>(adherent, HttpStatus.OK))
                .orElseThrow(() -> new ResourceNotFoundException("Adherent not found with ID: " + id));
    }

    @PostMapping("/users")
    public ResponseEntity<User> createAdherent(@Valid @RequestBody User adherent) {
        User createdAdherent = formationService.createAdherent(adherent);
        return new ResponseEntity<>(createdAdherent, HttpStatus.CREATED);
    }

    @PostMapping("/loans")
    public ResponseEntity<Loan> createAffectation(@Valid @RequestBody Loan adherent) {
        Loan createdAdherent = formationService.createAffectation(adherent);
        return new ResponseEntity<>(createdAdherent, HttpStatus.CREATED);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateAdherent(@PathVariable("id") long id, @Valid @RequestBody User adherent) {
        User updatedAdherent = formationService.updateAdherent(id, adherent);
        return updatedAdherent != null ? new ResponseEntity<>(updatedAdherent, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/loans/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable("id") long id, @Valid @RequestBody Loan adherent) {
        Loan updatedLoan = formationService.updateLoan(id, adherent);
        return updatedLoan != null ? new ResponseEntity<>(updatedLoan, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteAdherent(@PathVariable("id") long id) {
        formationService.deleteAdherent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/loans/{id}")
    public ResponseEntity<Void> deleteAffectation(@PathVariable("id") long id) {
        formationService.deleteAffectation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}