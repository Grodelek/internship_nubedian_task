package com.internship.InternshipTask.controllers;

import com.internship.InternshipTask.dto.TypeDTO;
import com.internship.InternshipTask.models.Type;
import com.internship.InternshipTask.services.TypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/types")
public class TypeController {
    private final TypeService typeService;

    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping
    public List<Type> getAllTypes() {
        return typeService.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Type> createType(@RequestBody TypeDTO typeDTO) { return typeService.create(typeDTO);}

    @GetMapping("/{id}")
    public ResponseEntity<Type> getTypeById(@PathVariable UUID id) {
        return typeService.getTypeById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Type> update(@PathVariable UUID id, @RequestBody TypeDTO typeDTO) {
        return typeService.update(id, typeDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return typeService.delete(id);
    }
}
