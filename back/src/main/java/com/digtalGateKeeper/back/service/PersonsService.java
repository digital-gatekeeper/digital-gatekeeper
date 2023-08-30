package com.digtalGateKeeper.back.service;

import java.util.List;

import com.digtalGateKeeper.back.model.Persons;

public interface PersonsService {
    
    Persons createPersons(Persons rooms);

    List<Persons> getAllPersons();

    Persons getPersonsById(Long id);

    Persons updatePersons(Long id, Persons persons);

    String deletePersons(Long id);
}
