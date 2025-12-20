package com.internship.InternshipTask.repositories;

import com.internship.InternshipTask.models.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface TypeRepository extends JpaRepository<Type, UUID> {
}