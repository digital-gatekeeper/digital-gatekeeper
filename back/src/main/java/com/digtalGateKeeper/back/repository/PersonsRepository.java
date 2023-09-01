package com.digtalGateKeeper.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digtalGateKeeper.back.model.Persons;

public interface PersonsRepository extends JpaRepository<Persons, Long> {

}
