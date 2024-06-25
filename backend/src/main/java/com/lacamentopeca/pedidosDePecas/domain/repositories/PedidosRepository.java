package com.lacamentopeca.pedidosDePecas.domain.repositories;

import com.lacamentopeca.pedidosDePecas.domain.pedidos.Pedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidosRepository extends JpaRepository<Pedidos, Integer> {
    List<Pedidos> findByStatus(String status);
}
