package com.internship.InternshipTask.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "efficiency_rating")
@Getter
@Setter
public class EfficiencyRating {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(unique = true)
    private String efficiencyRating;

}
