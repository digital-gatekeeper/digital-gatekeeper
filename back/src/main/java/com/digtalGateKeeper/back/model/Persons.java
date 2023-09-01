package com.digtalGateKeeper.back.model;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import com.digtalGateKeeper.back.service.PasswordService;

import jakarta.persistence.*;

@Entity
@Table(name = "Persons")
@Getter
@Setter
@NoArgsConstructor
public class Persons {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String password;

    private String role;

    private String numero;

    public Persons(String email, String name, String password, String role, String numero, PasswordService passwordService) {
        this.email = email;
        this.name = name;
        this.password = passwordService.encodePassword(password);
        this.role = role;
        this.numero = numero;
    }

    public void setPassword(String password, PasswordService passwordService) {
        this.password = passwordService.encodePassword(password);
    }
}

