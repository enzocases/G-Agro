package com.gagro.backend.repository;

import com.gagro.backend.Models.Cultura;
import com.gagro.backend.Models.Plantio;
import com.gagro.backend.Models.Terreno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface PlantioRepository extends JpaRepository<Plantio, Long> {

    List<Plantio> findByCultura(Cultura cultura);
    List<Plantio> findByTerreno(Terreno terreno);
}