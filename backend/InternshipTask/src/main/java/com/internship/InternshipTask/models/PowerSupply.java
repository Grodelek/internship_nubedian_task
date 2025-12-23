package com.internship.InternshipTask.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @JoinColumn(name = "type_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Type type;

    @ManyToOne
    @JoinColumn(name = "efficiency_rating_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private EfficiencyRating efficiencyRating;
}
