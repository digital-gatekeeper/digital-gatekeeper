package com.digtalGateKeeper.back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.digtalGateKeeper.back.model.Rooms;
import com.digtalGateKeeper.back.repository.HotelsRepository;
import com.digtalGateKeeper.back.repository.RoomsRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RoomsServiceImpl implements RoomsService {

    private final RoomsRepository roomsRepository;

    private final HotelsRepository hotelsRepository;


    @Override
    public Rooms createRooms(Long hotelsId, Rooms rooms) {
     
        Rooms room = hotelsRepository.findById(hotelsId).map(h ->
        {
            h.getRooms().add(rooms);
            return roomsRepository.save(rooms);
        }).orElseThrow(() -> new EntityNotFoundException("Hotels non trouvé !"));
        return room;
    }

        

    @Override
    public List<Rooms> getAllRooms() {
       return roomsRepository.findAll();
    }

    @Override
    public Rooms updateRooms(Long roomsId, Rooms Rooms) {

        return roomsRepository.findById(roomsId)
        .map(r -> 
        {
            r.setIpv6(Rooms.getIpv6());
            r.setNumero(Rooms.getNumero());
            r.setPlace(Rooms.getPlace());
            return roomsRepository.save(r);
        }).orElseThrow(() -> new EntityNotFoundException("Rooms non trouvé !"));
    }

    @Override
    public String deleteRooms(Long roomsId) {
        roomsRepository.deleteById(roomsId);
        return "Rooms supprimé !";
    }

    @Override
    public Rooms getRoomsById(Long id) {
        return roomsRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Rooms non trouvé !"));
    }
    
}
