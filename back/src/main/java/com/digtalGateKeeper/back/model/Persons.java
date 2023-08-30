package com.digtalGateKeeper.back.model;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "Persons")
@Getter
@Setter
@NoArgsConstructor
public class Persons
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String password;

    private String role;

    private String numero;
}