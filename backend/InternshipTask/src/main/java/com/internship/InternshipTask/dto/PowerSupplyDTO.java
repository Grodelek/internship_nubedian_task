package com.internship.InternshipTask.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
public class PowerSupplyDTO{
    private String brand;
    private String model;
    private Integer power;
    private Integer numberOfPCI;
    private Integer numberOfSATA;
    private Integer numberOfM2;
    private BigDecimal price;
    private UUID typeId;
    private UUID efficiencyRatingId;
}