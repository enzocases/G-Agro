package com.gagro.backend.repository;

import com.gagro.backend.Models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    public Produto findByTipo(String tipo);
}
