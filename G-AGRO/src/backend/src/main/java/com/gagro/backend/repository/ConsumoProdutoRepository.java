package com.gagro.backend.repository;

import com.gagro.backend.Models.ConsumoProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsumoProdutoRepository extends JpaRepository<ConsumoProduto, Long> {
   
}