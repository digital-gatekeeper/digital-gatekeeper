package com.digtalGateKeeper.back.modele;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "Hotels")
@Getter
@Setter
@NoArgsConstructor
public class Hotels
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; 
}