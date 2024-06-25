package com.lacamentopeca.pedidosDePecas.domain.repositories;

import com.lacamentopeca.pedidosDePecas.domain.pecas.Pecas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PecasRepository extends JpaRepository<Pecas, Integer> {
    Optional<Pecas> findById(Integer id);
    List<Pecas>findAllByActiveTrue();
    Pecas findByCodPecaDatasul(Integer codPecaDatasul);
    List<Pecas> findAllByPartNumber(String partNumber);
    Pecas findByNomePeca(String nomePeca);
    Pecas findByFabricante(String fabricante);

    Pecas findByPartNumber(String partNumber);
}
