package com.gagro.backend.repository;

import com.gagro.backend.Models.Terreno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TerrenoRepository extends JpaRepository<Terreno, Long> {
    Terreno findByNome(String nome);
}