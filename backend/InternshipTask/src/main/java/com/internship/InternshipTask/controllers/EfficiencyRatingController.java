package com.internship.InternshipTask.controllers;

import com.internship.InternshipTask.dto.EfficiencyRatingDTO;
import com.internship.InternshipTask.models.EfficiencyRating;
import com.internship.InternshipTask.services.EfficiencyRatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/efficiency-ratings")
public class EfficiencyRatingController {
    private final EfficiencyRatingService efficiencyRatingService;

    public EfficiencyRatingController(EfficiencyRatingService efficiencyRatingService) {
        this.efficiencyRatingService = efficiencyRatingService;
    }

    @GetMapping
    public List<EfficiencyRating> getAllEfficiencyRatings() {
        return efficiencyRatingService.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<EfficiencyRating> createEfficiencyRating(@RequestBody EfficiencyRatingDTO efficiencyRatingDTO) { return efficiencyRatingService.create(efficiencyRatingDTO);}

    @GetMapping("/{id}")
    public ResponseEntity<EfficiencyRating> getEfficiencyRatingById(@PathVariable UUID id) {
        return efficiencyRatingService.getById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EfficiencyRating> update(@PathVariable UUID id, @RequestBody EfficiencyRatingDTO efficiencyRatingDTO) {
        return efficiencyRatingService.update(id, efficiencyRatingDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return efficiencyRatingService.delete(id);
    }
}

