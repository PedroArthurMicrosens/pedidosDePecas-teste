package com.lacamentopeca.pedidosDePecas.domain.repositories;

import com.lacamentopeca.pedidosDePecas.domain.usuarios.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {
    UserDetails findByUsername(String username);
}
