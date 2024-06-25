package com.lacamentopeca.pedidosDePecas.config;

import lombok.Getter;
import org.springframework.context.annotation.Configuration;

@Getter
public class JdbcConfig {
    private final String url = "jdbc:postgresql://localhost:5432/pedidos-teste";
    private final String user = "postgres";
    private final String password = "microsens";
}
