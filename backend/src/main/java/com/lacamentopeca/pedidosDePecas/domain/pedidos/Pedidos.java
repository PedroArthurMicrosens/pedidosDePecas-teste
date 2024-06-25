package com.lacamentopeca.pedidosDePecas.domain.pedidos;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "pedidos")
@Entity(name = "pedidos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Pedidos {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pedidos_seq")
    @SequenceGenerator(name = "pedidos_seq", sequenceName = "pedidos_seq", allocationSize = 1)
    private Integer id;

    private Integer peca_id;

    private Integer usuarios_id_abertura;

    private Integer usuarios_id_fechamento;

    private LocalDateTime data_pedidos;

    private LocalDateTime data_pedidos_fechamento;

    private String status;

    private Integer ordem_servico;

    public Pedidos(RequestPedidos requestPedidos){
        this.peca_id = requestPedidos.peca_id();
        this.ordem_servico = requestPedidos.ordem_servico();
        this.status = "SOLICITADO";
    }



}
