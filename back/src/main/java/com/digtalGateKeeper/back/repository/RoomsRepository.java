package com.digtalGateKeeper.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.digtalGateKeeper.back.model.Rooms;

public interface RoomsRepository extends JpaRepository<Rooms, Long> {
    
}

