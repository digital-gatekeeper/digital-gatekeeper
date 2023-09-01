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

import com.digtalGateKeeper.back.model.Hotels;
import com.digtalGateKeeper.back.model.Rooms;
import com.digtalGateKeeper.back.service.HotelsService;
import com.digtalGateKeeper.back.utils.LogUtils;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/hotels")
@AllArgsConstructor
public class HotelsController {

    private final HotelsService hotelsService;
    private final LogUtils logUtils = new LogUtils();

    @PostMapping("/create")
    public Hotels create(@RequestBody Hotels hotel) {
        logUtils.log("create hotel: " + hotel + " at " + java.time.LocalDateTime.now());
        return hotelsService.createHotels(hotel);
    }

    @GetMapping("/get")
    public List<Hotels> readAll() {
        logUtils.log("read all hotels at " + java.time.LocalDateTime.now());
        return hotelsService.getAllHotels();
    }

    @GetMapping("/get/{id}")
    public Hotels readOne(@PathVariable Long id) {
        logUtils.log("read hotel with id: " + id + " at " + java.time.LocalDateTime.now());
        return hotelsService.getHotelsById(id);
    }

    @PutMapping("/update/{id}")
    public Hotels update(@PathVariable Long id, @RequestBody Hotels hotel) {
        logUtils.log("update hotel with id: " + id + " at " + java.time.LocalDateTime.now());
        return hotelsService.updateHotels(id, hotel);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        logUtils.log("delete hotel with id: " + id + " at " + java.time.LocalDateTime.now());
        return hotelsService.deleteHotels(id);
    }

    @GetMapping("/{id}/rooms")
    public List<Rooms> readRooms(@PathVariable Long id)
    {
        logUtils.log("read all rooms from hotel with id: " + id + " at " + java.time.LocalDateTime.now());
        return hotelsService.getRoomsByHotels(id);
    
    }

    @DeleteMapping("/{id}/rooms")
    public String deleteRooms(@PathVariable Long id)
    {
        logUtils.log("delete all rooms from hotel with id: " + id + " at " + java.time.LocalDateTime.now());
        return hotelsService.deleteRoomsByHotels(id);
    }

}
