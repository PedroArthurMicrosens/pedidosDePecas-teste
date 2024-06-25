package com.lacamentopeca.pedidosDePecas.domain.usuarios;


public record LoginResponseDTO(
        String token,
        String username,
        Integer id,
        UserRoles role) {
}
