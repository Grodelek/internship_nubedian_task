package com.internship.InternshipTask.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "efficiency_rating")
@Data
public class EfficiencyRating {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String efficiencyRating;

}
