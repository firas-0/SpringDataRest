package org.cours.web;

import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;      // <-- Ajouté
import org.springframework.web.bind.annotation.RequestBody;  

// Allow the React dev server (http://localhost:3000) to call this endpoint
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    // If your React uses baseURL "http://localhost:8080/api", keep the /api prefix here:
    @GetMapping("/api/voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/api/voitures")
	public Voiture addVoiture(@RequestBody Voiture v) {
	    return voitureRepo.save(v);
	}
    // If you strictly want the TP's path "/voitures" instead, add this too or switch the mapping:
    // @GetMapping("/voitures")
    // public Iterable<Voiture> getVoitures2() { return voitureRepo.findAll(); }
}

