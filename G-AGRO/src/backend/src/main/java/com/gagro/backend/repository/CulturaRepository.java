package com.gagro.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gagro.backend.Models.Cultura;

@Repository
public interface CulturaRepository extends JpaRepository<Cultura, Long>{
}
