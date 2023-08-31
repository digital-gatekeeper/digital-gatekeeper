package com.digtalGateKeeper.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digtalGateKeeper.back.model.Persons;
import com.digtalGateKeeper.back.repository.PersonsRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class PersonsServiceImpl implements PersonsService {

    private final PersonsRepository personsRepository;

    @Autowired
    private PasswordService passwordService;

    @Override
    public Persons createPersons(Persons Persons) {
        return personsRepository.save(Persons);
    }

    @Override
    public List<Persons> getAllPersons() {
       return personsRepository.findAll();
    }

    @Override
    public Persons updatePersons(Long id, Persons Persons) {
        return personsRepository.findById(id)
        .map(p -> 
        {
            p.setEmail(Persons.getEmail());
            p.setPassword(Persons.getPassword(), passwordService);
            p.setRole(Persons.getRole());
            p.setNumero(Persons.getNumero());
            p.setName(Persons.getName());
            return personsRepository.save(p);
        }).orElseThrow(() -> new EntityNotFoundException("Persons non trouvé !"));
    }

    @Override
    public String deletePersons(Long id) {
        personsRepository.deleteById(id);
        return "Persons supprimé !";
    }

    @Override
    public Persons getPersonsById(Long id) {
        return personsRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Persons non trouvé !"));
    }
    
}
