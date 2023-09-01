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

import com.digtalGateKeeper.back.model.Rooms;
import com.digtalGateKeeper.back.service.RoomsService;
import com.digtalGateKeeper.back.utils.LogUtils;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/rooms")
@AllArgsConstructor
public class RoomsController {
    
    private final RoomsService roomsService;

    private final LogUtils logUtils = new LogUtils();


    @PostMapping("{hotelsId}/create")
    public Rooms create(@PathVariable Long hotelsId, @RequestBody Rooms rooms)
    {
        logUtils.log("create room: " + rooms + " at " + java.time.LocalDateTime.now());
        return roomsService.createRooms(hotelsId, rooms);
    }

    @GetMapping("/get")
    public List<Rooms> readAll()
    {
        logUtils.log("read all rooms at " + java.time.LocalDateTime.now());
        return roomsService.getAllRooms();
    }

    @GetMapping("/get/{id}")
    public Rooms readOne(@PathVariable Long id)
    {
        logUtils.log("read rooms with id: " + id + " at " + java.time.LocalDateTime.now());
        return roomsService.getRoomsById(id);
    }

    @PutMapping("/update/{roomsId}")
    public Rooms update(@PathVariable Long roomsId, @RequestBody Rooms hotel)
    {
        logUtils.log("update rooms with id: " + roomsId + " at " + java.time.LocalDateTime.now());
        return roomsService.updateRooms(roomsId, hotel);
    }

    @DeleteMapping("/delete/{roomsId}")
    public String delete(@PathVariable Long roomsId)
    {
        logUtils.log("delete rooms with id: " + roomsId + " at " + java.time.LocalDateTime.now());
        return roomsService.deleteRooms(roomsId);
    }

    


}
