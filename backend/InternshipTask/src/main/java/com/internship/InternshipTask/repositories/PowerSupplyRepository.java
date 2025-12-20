package com.internship.InternshipTask.repositories;

import com.internship.InternshipTask.models.PowerSupply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PowerSupplyRepository extends JpaRepository<PowerSupply, UUID> {
}
