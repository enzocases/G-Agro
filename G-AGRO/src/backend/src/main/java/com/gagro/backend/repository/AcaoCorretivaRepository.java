package com.gagro.backend.repository;

import com.gagro.backend.Models.AcaoCorretiva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcaoCorretivaRepository extends JpaRepository<AcaoCorretiva, Long> {
    List<AcaoCorretiva> findByColheitaId(Long colheitaId);
}
