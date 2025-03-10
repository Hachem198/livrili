package com.sfar.livrili.Domains.Dto;


import com.sfar.livrili.Domains.Entities.PackageStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PackRequestDto {



    private String description;


    private String weight;


    private String pickUpLocation;


    private String dropOffLocation;



}
