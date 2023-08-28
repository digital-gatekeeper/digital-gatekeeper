package com.digtalGateKeeper.back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.digtalGateKeeper.back.modele.Hotels;
import com.digtalGateKeeper.back.repository.HotelsRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HotelsServiceImpl implements HotelsService {

    private final HotelsRepository hotelsRepository;

    @Override
    public Hotels createHotels(Hotels hotels) {
        return hotelsRepository.save(hotels);
    }

    @Override
    public List<Hotels> getAllHotels() {
       return hotelsRepository.findAll();
    }

    @Override
    public Hotels updateHotels(Long id, Hotels hotels) {
        return hotelsRepository.findById(id)
        .map(h -> 
        {
            h.setName(hotels.getName());
            return hotelsRepository.save(h);
        }).orElseThrow(() -> new EntityNotFoundException("Hotel non trouvé !"));
    }

    @Override
    public String deleteHotels(Long id) {
        hotelsRepository.deleteById(id);
        return "Hotel supprimé !";
    }

    @Override
    public Hotels getHotelsById(Long id) {
        return hotelsRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Hotel non trouvé !"));
    }
    
}
