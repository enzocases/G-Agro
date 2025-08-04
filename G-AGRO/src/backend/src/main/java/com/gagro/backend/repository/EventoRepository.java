package com.gagro.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gagro.backend.Models.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
 
}