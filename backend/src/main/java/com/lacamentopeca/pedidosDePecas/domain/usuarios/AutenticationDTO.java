package com.lacamentopeca.pedidosDePecas.domain.usuarios;

public record AutenticationDTO(String username, String password) {
    public String getUsername() {
        return username;
    }

    public Object getPassword() {
        return password;
    }
}
