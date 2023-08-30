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

import com.digtalGateKeeper.back.model.Persons;
import com.digtalGateKeeper.back.service.PersonsService;
import com.digtalGateKeeper.back.utils.LogUtils;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/persons")
@AllArgsConstructor
public class PersonsController {
    
    private final PersonsService PersonsService;

    private final LogUtils logUtils = new LogUtils();


    @PostMapping("/create")
    public Persons create( @RequestBody Persons Persons)
    {
        logUtils.log("create persons: " + Persons + " at " + java.time.LocalDateTime.now());
        return PersonsService.createPersons(Persons);
    }

    @GetMapping("/get")
    public List<Persons> readAll()
    {
        logUtils.log("read all persons at " + java.time.LocalDateTime.now());
        return PersonsService.getAllPersons();
    }

    @GetMapping("/get/{id}")
    public Persons readOne(@PathVariable Long id)
    {
        logUtils.log("read persons with id: " + id + " at " + java.time.LocalDateTime.now());
        return PersonsService.getPersonsById(id);
    }

    @PutMapping("/update/{personsId}")
    public Persons update(@PathVariable Long personsId, @RequestBody Persons hotel)
    {
        logUtils.log("update persons with id: " + personsId + " at " + java.time.LocalDateTime.now());
        return PersonsService.updatePersons(personsId, hotel);
    }

    @DeleteMapping("/delete/{personsId}")
    public String delete(@PathVariable Long personsId)
    {
        logUtils.log("delete persons with id: " + personsId + " at " + java.time.LocalDateTime.now());
        return PersonsService.deletePersons(personsId);
    }

    


}
