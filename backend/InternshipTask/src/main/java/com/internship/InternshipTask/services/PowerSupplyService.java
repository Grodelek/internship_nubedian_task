package com.internship.InternshipTask.services;

import com.internship.InternshipTask.dto.PowerSupplyDTO;
import com.internship.InternshipTask.models.EfficiencyRating;
import com.internship.InternshipTask.models.PowerSupply;
import com.internship.InternshipTask.models.Type;
import com.internship.InternshipTask.repositories.PowerSupplyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PowerSupplyService {
   private final PowerSupplyRepository powerSupplyRepository;
   private final TypeService typeService;
   private final EfficiencyRatingService efficiencyRatingService;

    PowerSupplyService(PowerSupplyRepository powerSupplyRepository, TypeService typeService, EfficiencyRatingService efficiencyRatingService){
     this.powerSupplyRepository = powerSupplyRepository;
     this.typeService = typeService;
     this.efficiencyRatingService = efficiencyRatingService;
    }

    public ResponseEntity<PowerSupply> createPowerSupply(PowerSupplyDTO powerSupplyDTO) {
     if(powerSupplyDTO == null ||
        powerSupplyDTO.getBrand() == null || powerSupplyDTO.getBrand().trim().isEmpty() ||
        powerSupplyDTO.getModel() == null || powerSupplyDTO.getModel().trim().isEmpty() ||
        powerSupplyDTO.getPower() == null || powerSupplyDTO.getPower() <= 0 ||
        powerSupplyDTO.getNumberOfPCI() == null || powerSupplyDTO.getNumberOfPCI() < 0 ||
        powerSupplyDTO.getNumberOfSATA() == null || powerSupplyDTO.getNumberOfSATA() < 0 ||
        powerSupplyDTO.getNumberOfM2() == null || powerSupplyDTO.getNumberOfM2() < 0 ||
        powerSupplyDTO.getPrice() == null || powerSupplyDTO.getPrice().compareTo(java.math.BigDecimal.ZERO) <= 0 ||
        powerSupplyDTO.getTypeId() == null ||
        powerSupplyDTO.getEfficiencyRatingId() == null) {
      return ResponseEntity.badRequest().build();
     }

     ResponseEntity<Type> typeResponse = typeService.getTypeById(powerSupplyDTO.getTypeId());
     if(typeResponse.getStatusCode().isError() || typeResponse.getBody() == null) {
      return ResponseEntity.badRequest().build();
     }

     ResponseEntity<EfficiencyRating> efficiencyRatingResponse = efficiencyRatingService.getById(powerSupplyDTO.getEfficiencyRatingId());
     if(efficiencyRatingResponse.getStatusCode().isError() || efficiencyRatingResponse.getBody() == null) {
      return ResponseEntity.badRequest().build();
     }

     PowerSupply powerSupply = new PowerSupply();
     powerSupply.setBrand(powerSupplyDTO.getBrand());
     powerSupply.setModel(powerSupplyDTO.getModel());
     powerSupply.setNumberOfPCI(powerSupplyDTO.getNumberOfPCI());
     powerSupply.setNumberOfSATA(powerSupplyDTO.getNumberOfSATA());
     powerSupply.setNumberOfM2(powerSupplyDTO.getNumberOfM2());
     powerSupply.setPower(powerSupplyDTO.getPower());
     powerSupply.setPrice(powerSupplyDTO.getPrice());
     powerSupply.setType(typeResponse.getBody());
     powerSupply.setEfficiencyRating(efficiencyRatingResponse.getBody());
     PowerSupply saved = powerSupplyRepository.save(powerSupply);
     return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    public ResponseEntity<List<PowerSupply>> getAllPowerSupplies() {
     List<PowerSupply> powerSupplyList = powerSupplyRepository.findAll();
     return ResponseEntity.ok().body(powerSupplyList);
    }

  public ResponseEntity<PowerSupply> getPowerSupply(UUID id) {
   return powerSupplyRepository.findById(id)
           .map(ps -> ResponseEntity.ok(ps))
           .orElse(ResponseEntity.notFound().build());
  }

  public ResponseEntity<PowerSupply> updatePowerSupply(PowerSupplyDTO powerSupplyDTO, UUID id) {
    if(powerSupplyDTO == null ||
       powerSupplyDTO.getBrand() == null || powerSupplyDTO.getBrand().trim().isEmpty() ||
       powerSupplyDTO.getModel() == null || powerSupplyDTO.getModel().trim().isEmpty() ||
       powerSupplyDTO.getPower() == null || powerSupplyDTO.getPower() <= 0 ||
       powerSupplyDTO.getNumberOfPCI() == null || powerSupplyDTO.getNumberOfPCI() < 0 ||
       powerSupplyDTO.getNumberOfSATA() == null || powerSupplyDTO.getNumberOfSATA() < 0 ||
       powerSupplyDTO.getNumberOfM2() == null || powerSupplyDTO.getNumberOfM2() < 0 ||
       powerSupplyDTO.getPrice() == null || powerSupplyDTO.getPrice().compareTo(java.math.BigDecimal.ZERO) <= 0 ||
       powerSupplyDTO.getTypeId() == null ||
       powerSupplyDTO.getEfficiencyRatingId() == null) {
     return ResponseEntity.badRequest().build();
    }

    Optional<PowerSupply> powerSupplyOptional = powerSupplyRepository.findById(id);
    if (powerSupplyOptional.isEmpty()) {
     return ResponseEntity.notFound().build();
    }

    ResponseEntity<Type> typeResponse = typeService.getTypeById(powerSupplyDTO.getTypeId());
    if(typeResponse.getStatusCode().isError() || typeResponse.getBody() == null) {
     return ResponseEntity.badRequest().build();
    }

    ResponseEntity<EfficiencyRating> efficiencyRatingResponse = efficiencyRatingService.getById(powerSupplyDTO.getEfficiencyRatingId());
    if(efficiencyRatingResponse.getStatusCode().isError() || efficiencyRatingResponse.getBody() == null) {
     return ResponseEntity.badRequest().build();
    }

    PowerSupply powerSupply = powerSupplyOptional.get();
    powerSupply.setBrand(powerSupplyDTO.getBrand());
    powerSupply.setModel(powerSupplyDTO.getModel());
    powerSupply.setPower(powerSupplyDTO.getPower());
    powerSupply.setNumberOfPCI(powerSupplyDTO.getNumberOfPCI());
    powerSupply.setNumberOfSATA(powerSupplyDTO.getNumberOfSATA());
    powerSupply.setNumberOfM2(powerSupplyDTO.getNumberOfM2());
    powerSupply.setPrice(powerSupplyDTO.getPrice());
    powerSupply.setType(typeResponse.getBody());
    powerSupply.setEfficiencyRating(efficiencyRatingResponse.getBody());

    PowerSupply saved = powerSupplyRepository.save(powerSupply);

    return ResponseEntity.ok(saved);
  }

  public ResponseEntity<Void> delete(UUID id) {
    Optional<PowerSupply> powerSupplyOptional = powerSupplyRepository.findById(id);
    if(powerSupplyOptional.isPresent()){
      powerSupplyRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
 }

