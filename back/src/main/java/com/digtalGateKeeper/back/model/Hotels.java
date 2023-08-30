package com.digtalGateKeeper.back.model;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "hotels_id")
    private Set<Rooms> rooms = new HashSet<>();

    public void removeRooms()
    {
        rooms.clear();
    }
}