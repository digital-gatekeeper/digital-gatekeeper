package com.digtalGateKeeper.back.service;

import java.util.List;

import com.digtalGateKeeper.back.modele.Hotels;

public interface HotelsService {
    
    Hotels createHotels(Hotels hotels);

    List<Hotels> getAllHotels();

    Hotels getHotelsById(Long id);

    Hotels updateHotels(Long id, Hotels hotels);

    String deleteHotels(Long id);

}
