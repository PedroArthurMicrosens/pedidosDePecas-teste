package com.lacamentopeca.pedidosDePecas.domain.repositories;

import com.lacamentopeca.pedidosDePecas.domain.page.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PageRepository extends JpaRepository<Page, Integer> {
    Optional<Page> findById(Integer id);

    List<Page> findAll();
}
