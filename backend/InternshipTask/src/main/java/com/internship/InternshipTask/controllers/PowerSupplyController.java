package com.internship.InternshipTask.controllers;

import com.internship.InternshipTask.dto.PowerSupplyDTO;
import com.internship.InternshipTask.models.PowerSupply;
import com.internship.InternshipTask.services.PowerSupplyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/power-supply")
public class PowerSupplyController {
    private final PowerSupplyService powerSupplyService;

    public PowerSupplyController(PowerSupplyService powerSupplyService){
        this.powerSupplyService = powerSupplyService;
    }

    @PostMapping("/add")
    public ResponseEntity<PowerSupply> createPowerSupply(@RequestBody PowerSupplyDTO powerSupplyDTO){
        return powerSupplyService.createPowerSupply(powerSupplyDTO);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<PowerSupply>> getAllPowerSupplies(){
        return powerSupplyService.getAllPowerSupplies();
    }

    @GetMapping("/get-power-supply/{id}")
    public ResponseEntity<PowerSupply> getPowerSupply(@PathVariable UUID id){
        return powerSupplyService.getPowerSupply(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PowerSupply> updatePowerSupply(@PathVariable UUID id, @RequestBody PowerSupplyDTO powerSupplyDTO){
        return powerSupplyService.updatePowerSupply(powerSupplyDTO, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return powerSupplyService.delete(id);
    }
}
