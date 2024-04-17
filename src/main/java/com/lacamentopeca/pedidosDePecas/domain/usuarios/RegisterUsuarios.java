package com.lacamentopeca.pedidosDePecas.domain.usuarios;

import jakarta.validation.constraints.NotNull;

public record RegisterUsuarios(
        @NotNull
        String username,
        @NotNull
        String password,
        @NotNull
        UserRoles role
) {
}
