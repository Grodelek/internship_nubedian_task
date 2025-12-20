package com.internship.InternshipTask.services;

import com.internship.InternshipTask.dto.EfficiencyRatingDTO;
import com.internship.InternshipTask.models.EfficiencyRating;
import com.internship.InternshipTask.repositories.EfficiencyRatingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EfficiencyRatingService {
    private EfficiencyRatingRepository efficiencyRatingRepository;

    public EfficiencyRatingService(EfficiencyRatingRepository efficiencyRatingRepository) {
        this.efficiencyRatingRepository = efficiencyRatingRepository;
    }

    public List<EfficiencyRating> getAll(){
        return efficiencyRatingRepository.findAll();
    }

    public ResponseEntity<EfficiencyRating> getById(UUID id){
      return efficiencyRatingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<EfficiencyRating> create(EfficiencyRatingDTO efficiencyRatingDTO) {
        if(efficiencyRatingDTO.getEfficiencyRating() == null || efficiencyRatingDTO.getEfficiencyRating().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        EfficiencyRating efficiencyRating = new EfficiencyRating();
        efficiencyRating.setEfficiencyRating(efficiencyRatingDTO.getEfficiencyRating());
        EfficiencyRating saved = efficiencyRatingRepository.save(efficiencyRating);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    public ResponseEntity<EfficiencyRating> update(UUID id, EfficiencyRatingDTO efficiencyRatingDTO) {
        if(efficiencyRatingDTO.getEfficiencyRating() == null || efficiencyRatingDTO.getEfficiencyRating().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<EfficiencyRating> efficiencyRatingOptional = efficiencyRatingRepository.findById(id);
        if(efficiencyRatingOptional.isPresent()){
            EfficiencyRating efficiencyRating = efficiencyRatingOptional.get();
            efficiencyRating.setEfficiencyRating(efficiencyRatingDTO.getEfficiencyRating());
            EfficiencyRating saved = efficiencyRatingRepository.save(efficiencyRating);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> delete(UUID id) {
        Optional<EfficiencyRating> efficiencyRatingOptional = efficiencyRatingRepository.findById(id);
        if(efficiencyRatingOptional.isPresent()){
            efficiencyRatingRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
