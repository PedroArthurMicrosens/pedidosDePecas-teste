package com.lacamentopeca.pedidosDePecas.domain.pecas;

import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record RequestPecas(
        Integer id,
        @NotNull
        String nome_peca,
        @NotNull
        Integer cod_peca,
        @NotNull
        String part_number,
        @NotNull
        String fabricante,
        Boolean active
)
{}
