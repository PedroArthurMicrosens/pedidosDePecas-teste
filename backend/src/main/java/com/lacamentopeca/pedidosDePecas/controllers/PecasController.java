package com.lacamentopeca.pedidosDePecas.controllers;

import com.lacamentopeca.pedidosDePecas.domain.pecas.Pecas;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PecasRepository;
import com.lacamentopeca.pedidosDePecas.domain.pecas.RequestPecas;
import com.lacamentopeca.pedidosDePecas.services.PecasService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/pecas")
public class PecasController {
    @Autowired
    private PecasRepository repository;
    private PecasService service;



    @CrossOrigin(origins = "*")
    @GetMapping("{cod_item}")
    public ResponseEntity getPecaByCodigo2(@PathVariable Integer cod_item) {
        Pecas peca = repository.findByCodPecaDatasul(cod_item);
        if (peca != null) {
            System.out.println(peca);
            return ResponseEntity.ok(peca);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pn2/{partNumber}")
    public ResponseEntity getPecaByPartNumber(@PathVariable String partNumber) {
        Pecas peca = repository.findByPartNumber(partNumber);
        if (peca != null) {
            return ResponseEntity.ok(peca);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity getAllPecas(){
        var allPecas = repository.findAll();
        return ResponseEntity.ok(allPecas);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("codpeca/{cod_item}")
    public List<Pecas>  getPecaByCodigo(@PathVariable Integer cod_item) {
        return service.executeQuery("where cod_peca_datasul = ?", cod_item);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/descricao/{descricao}")
    public List<Pecas> getPecaByDescricao(@PathVariable String descricao) {
        return service.executeQuery("where nome_peca ilike ?", "%" + descricao + "%");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pn/{partNumber}")
    public List<Pecas> getPecaByPartNumber2(@PathVariable String partNumber) {
        return service.executeQuery("where part_number ilike ?", "%" + partNumber + "%");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/fabricante/{fabricante}")
    public List<Pecas> getPecaByFabricante(@PathVariable String fabricante) {
        return service.executeQuery("where fabricante ilike ?", "%" + fabricante + "%");
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/register")
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
            pecas.setNomePeca(data.nome_peca());
            pecas.setCodPecaDatasul(data.codPecaDatasul());
            pecas.setFabricante(data.fabricante());
            pecas.setPartNumber(data.partNumber());
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
