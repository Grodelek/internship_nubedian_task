package com.internship.InternshipTask.models;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "power_supply")
public class PowerSupply {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    @Column(nullable = false)
    private Integer power;
    @Column(name = "number_of_pci", nullable = false)
    private Integer numberOfPCI;
    @Column(name = "number_of_sata", nullable = false)
    private Integer numberOfSATA;
    @Column(name = "number_of_m2", nullable = false)
    private Integer numberOfM2;
    @Column(nullable = false)
    private BigDecimal price;
    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private Type type;
    @ManyToOne
    @JoinColumn(name = "efficiency_rating_id", nullable = false)
    private EfficiencyRating efficiencyRating;
}
