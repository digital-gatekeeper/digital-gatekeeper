package com.digtalGateKeeper.back.model;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "Rooms")
@Getter
@Setter
@NoArgsConstructor
public class Rooms
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ipv6; 

    private Integer numero;

    private Integer place; 
}