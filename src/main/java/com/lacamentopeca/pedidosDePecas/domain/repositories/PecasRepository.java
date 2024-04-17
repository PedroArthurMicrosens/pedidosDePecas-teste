package com.lacamentopeca.pedidosDePecas.domain.repositories;

import com.lacamentopeca.pedidosDePecas.domain.pecas.Pecas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PecasRepository extends JpaRepository<Pecas, Integer> {
    List<Pecas>findAllByActiveTrue();
}
