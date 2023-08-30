package com.digtalGateKeeper.back.service;

import java.util.List;

import com.digtalGateKeeper.back.model.Rooms;

public interface RoomsService {
    
    Rooms createRooms( Long hotelId, Rooms rooms);

    List<Rooms> getAllRooms();

    Rooms getRoomsById(Long id);

    Rooms updateRooms(Long roomsId, Rooms rooms);

    String deleteRooms(Long roomsId);
}
