package com.gagro.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gagro.backend.Models.Lembrete;


@Repository
public interface LembreteRepository extends JpaRepository<Lembrete, Long> {
}