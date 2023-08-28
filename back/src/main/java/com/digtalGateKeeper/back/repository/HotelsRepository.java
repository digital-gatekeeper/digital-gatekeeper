package com.digtalGateKeeper.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.digtalGateKeeper.back.modele.Hotels;

public interface HotelsRepository extends JpaRepository<Hotels, Long> {
    
}

