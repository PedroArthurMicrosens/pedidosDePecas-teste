package com.lacamentopeca.pedidosDePecas.domain.pecas;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.IdGeneratorType;

import java.io.Serial;

@Table(name = "pecas")
@Entity(name="pecas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Pecas {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pecas_seq")
    @SequenceGenerator(name = "pecas_seq", sequenceName = "pecas_seq", allocationSize = 1)
    private Integer id;

    private String nome_peca;

    private int cod_peca_datasul;

    private String part_Number;

    private String fabricante;

    private Boolean active;

    public Pecas(RequestPecas requestPecas){
        this.nome_peca = requestPecas.nome_peca();
        this.cod_peca_datasul = (int) requestPecas.cod_peca();
        this.part_Number = requestPecas.part_number();
        this.fabricante = requestPecas.fabricante();
        this.active = requestPecas.active();
    }

}
