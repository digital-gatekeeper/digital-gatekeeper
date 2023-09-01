package com.digtalGateKeeper.back.service;

import java.util.List;

import com.digtalGateKeeper.back.model.Hotels;
import com.digtalGateKeeper.back.model.Rooms;

public interface HotelsService {
    
    Hotels createHotels(Hotels hotels);

    List<Hotels> getAllHotels();

    Hotels getHotelsById(Long id);

    Hotels updateHotels(Long id, Hotels hotels);

    String deleteHotels(Long id);

    List<Rooms> getRoomsByHotels(Long id);

    String deleteRoomsByHotels(Long id);

}
