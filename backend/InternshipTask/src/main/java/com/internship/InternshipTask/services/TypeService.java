package com.internship.InternshipTask.services;

import com.internship.InternshipTask.dto.TypeDTO;
import com.internship.InternshipTask.models.Type;
import com.internship.InternshipTask.repositories.TypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TypeService {
    private TypeRepository typeRepository;

    TypeService(TypeRepository typeRepository){
        this.typeRepository = typeRepository;
    }

    public List<Type> getAll(){
        return typeRepository.findAll();
    }

    public ResponseEntity<Type> getTypeById(UUID id){
      return typeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Type> create(TypeDTO typeDTO) {
        if(typeDTO.getType() == null || typeDTO.getType().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Type type = new Type();
        type.setType(typeDTO.getType());
        Type saved = typeRepository.save(type);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    public ResponseEntity<Type> update(UUID id, TypeDTO typeDTO) {
        if(typeDTO.getType() == null || typeDTO.getType().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Type> typeOptional = typeRepository.findById(id);
        if(typeOptional.isPresent()){
            Type type = typeOptional.get();
            type.setType(typeDTO.getType());
            Type saved = typeRepository.save(type);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> delete(UUID id) {
        Optional<Type> typeOptional = typeRepository.findById(id);
        if(typeOptional.isPresent()){
            typeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
