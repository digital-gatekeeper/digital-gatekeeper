package com.digtalGateKeeper.back.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digtalGateKeeper.back.modele.Hotels;
import com.digtalGateKeeper.back.service.HotelsService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/hotels")
@AllArgsConstructor
public class HotelsController {
    
    private final HotelsService hotelsService;

    @PostMapping("/create")
    public Hotels create(@RequestBody Hotels hotel)
    {
        return hotelsService.createHotels(hotel);
    }

    @GetMapping("/read")
    public List<Hotels> readAll()
    {
        return hotelsService.getAllHotels();
    }

    @GetMapping("/read/{id}")
    public Hotels readOne(@PathVariable Long id)
    {
        return hotelsService.getHotelsById(id);
    }

    @PutMapping("/update/{id}")
    public Hotels update(@PathVariable Long id, @RequestBody Hotels hotel)
    {
        return hotelsService.updateHotels(id, hotel);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id)
    {
        return hotelsService.deleteHotels(id);
    }


}
