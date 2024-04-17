package com.lacamentopeca.pedidosDePecas.controllers;

import com.lacamentopeca.pedidosDePecas.domain.pecas.Pecas;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PecasRepository;
import com.lacamentopeca.pedidosDePecas.domain.pecas.RequestPecas;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/pecas")
public class PecasController {
    @Autowired
    private PecasRepository repository;
    @GetMapping
    public ResponseEntity getAllPecas(){
        var allPecas = repository.findAllByActiveTrue();
        return ResponseEntity.ok(allPecas);
    }

    @PostMapping
    public ResponseEntity registerPecas(@RequestBody @Valid RequestPecas data){
        Pecas newPecas = new Pecas(data);
        System.out.println(data);
        repository.save(newPecas);
        return ResponseEntity.ok().build();
    }

    @PutMapping()
    @Transactional
    public ResponseEntity updatePecas(@RequestBody @Valid RequestPecas data){
        Optional<Pecas> optionalPecas = repository.findById(data.id());
        if(optionalPecas.isPresent()){
            Pecas pecas = optionalPecas.get();
            pecas.setNome_peca(data.nome_peca());
            pecas.setCod_peca_datasul(data.cod_peca());
            pecas.setFabricante(data.fabricante());
            pecas.setPart_Number(data.part_number());
            return ResponseEntity.ok(pecas);
        } else {
            throw new EntityNotFoundException();
        }
    }

    @DeleteMapping("{id}")
    @Transactional
    public ResponseEntity deletePecas(@PathVariable Integer id){
        Optional<Pecas> optionalPecas = repository.findById(id);
        if(optionalPecas.isPresent()){
            Pecas pecas = optionalPecas.get();
            pecas.setActive(false);
            return ResponseEntity.noContent().build();
        }else {throw new EntityNotFoundException();}
    }
}
