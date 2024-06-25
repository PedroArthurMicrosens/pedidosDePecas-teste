package com.lacamentopeca.pedidosDePecas.controllers;

import com.lacamentopeca.pedidosDePecas.config.JdbcConfig;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.CustomPedidoResponse;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.Pedidos;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.RequestPedidos;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PecasRepository;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PedidosRepository;
import com.lacamentopeca.pedidosDePecas.services.AuthorizationService;
import com.lacamentopeca.pedidosDePecas.services.PedidoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidosController {

    @Autowired
    private PedidosRepository repository;
    @Autowired
    private AuthorizationService userService;
    @Autowired
    private PecasRepository pecasRepository;
    @Autowired
    private PedidoService pedidoService;

    @GetMapping("/pedidos")
    public ResponseEntity getAllPedidos() {
        List<CustomPedidoResponse> allPedidos = pedidoService.executeQuery("");
        return ResponseEntity.ok(allPedidos);
    }

    @GetMapping("/{status}")
    public List<CustomPedidoResponse> getPedidosByStatus(@PathVariable String status) {
        return pedidoService.executeQuery("WHERE p.status = ?", status);
    }

    @GetMapping("/allpedido/{status}/{status2}")
    public List<CustomPedidoResponse> getPedidosByStatusAndStatus(@PathVariable String status, @PathVariable String status2) {
        return pedidoService.executeQuery("WHERE  p.status = ? OR p.status = ?", status, status2);
    }

    @GetMapping("/pedido/{status}/{id}")
    public List<CustomPedidoResponse> getPedidosByIdAndStatus(@PathVariable Integer id, @PathVariable String status) {
        return pedidoService.executeQuery("WHERE p.id = ? AND p.status = ?", id, status);
    }

    @GetMapping("/codPeca/{status}/{cod_peca}")
    public List<CustomPedidoResponse> getPedidosByCodAndStatus(@PathVariable Integer cod_peca, @PathVariable String status) {
        return pedidoService.executeQuery("WHERE pe.cod_peca_datasul = ? AND p.status = ?", cod_peca, status);
    }

    @GetMapping("/descricao/{status}/{nome_peca}")
    public List<CustomPedidoResponse> getPedidosByNameAndStatus(@PathVariable String nome_peca, @PathVariable String status) {
        return pedidoService.executeQuery("WHERE pe.nome_peca ILIKE ? AND p.status = ?", "%" + nome_peca + "%", status);
    }

    @GetMapping("/partnumber/{status}/{part_number}")
    public List<CustomPedidoResponse> getPedidosByPartnumberAndStatus(@PathVariable String part_number, @PathVariable String status) {
        return pedidoService.executeQuery("WHERE pe.part_number ILIKE ? AND p.status = ?", "%" + part_number + "%", status);
    }

    @GetMapping("/os/{status}/{os}")
    public List<CustomPedidoResponse> getPedidosByOsAndStatus(@PathVariable Integer os, @PathVariable String status) {
        return pedidoService.executeQuery("WHERE p.ordem_servico = ? AND p.status = ?", os, status);
    }

    @GetMapping("/pedido/{id}")
    public List<CustomPedidoResponse> getPedidoById(@PathVariable Integer id) {
        return pedidoService.executeQuery("WHERE p.id = ?", id);
    }

    @GetMapping("/codPeca/{cod_peca}")
    public List<CustomPedidoResponse> getPedidosByCod(@PathVariable Integer cod_peca) {
        return pedidoService.executeQuery("WHERE pe.cod_peca_datasul = ?", cod_peca);
    }

    @GetMapping("/descricao/{nome_peca}")
    public List<CustomPedidoResponse> getPedidosByName(@PathVariable String nome_peca) {
        return pedidoService.executeQuery("WHERE pe.nome_peca ILIKE ?", "%" + nome_peca + "%");
    }

    @GetMapping("/partnumber/{part_number}")
    public List<CustomPedidoResponse> getPedidosByPartnumber(@PathVariable String part_number) {
        return pedidoService.executeQuery("WHERE pe.part_number ILIKE ?", "%" + part_number + "%");
    }

    @GetMapping("/os/{os}")
    public List<CustomPedidoResponse> getPedidosByOs(@PathVariable Integer os) {
        return pedidoService.executeQuery("WHERE p.ordem_servico = ?", os);
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    public ResponseEntity registerPedido(@RequestBody @Valid RequestPedidos pedido) {
        if(pecasRepository.findById(pedido.id()).get().getActive() == true){
        Pedidos pedidos = new Pedidos(pedido);
        pedidos.setData_pedidos(LocalDateTime.now());
        pedidos.setOrdem_servico(pedidos.getOrdem_servico());
        pedidos.setUsuarios_id_abertura(pedido.usuarios_id_abertura());
        repository.save(pedidos);
        return ResponseEntity.ok().build();
        }else {
            System.out.println("peça inativa");
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("{id}")
    @Transactional
    public ResponseEntity updatePedido(@PathVariable Integer id) {
        Optional<Pedidos> optionalPedidos = repository.findById(id);
        if (optionalPedidos.isPresent()) {
            Pedidos pedido = optionalPedidos.get();
            pedido.setData_pedidos_fechamento(LocalDateTime.now());
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Integer userId = userService.obterIdPorNomeDeUsuario(username);
            pedido.setUsuarios_id_fechamento(userId);
            pedido.setStatus("CONCLUIDO");
            return ResponseEntity.ok(pedido);
        } else {
            throw new EntityNotFoundException();
        }
    }

    @PutMapping("fat/{id}")
    @Transactional
    public ResponseEntity updatePedidoFat(@PathVariable Integer id) {
        Optional<Pedidos> optionalPedidos = repository.findById(id);
        if (optionalPedidos.isPresent()) {
            Pedidos pedido = optionalPedidos.get();
            pedido.setStatus("FATURADO");
            return ResponseEntity.ok(pedido);
        } else {
            throw new EntityNotFoundException();
        }
    }

    @PutMapping("/cancel/{id}")
    @Transactional
    public ResponseEntity cancelPedido(@PathVariable Integer id) {
        Optional<Pedidos> optionalPedidos = repository.findById(id);
        if (optionalPedidos.isPresent()) {
            Pedidos pedido = optionalPedidos.get();
            pedido.setData_pedidos_fechamento(LocalDateTime.now());
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Integer userId = userService.obterIdPorNomeDeUsuario(username);
            pedido.setUsuarios_id_fechamento(userId);
            pedido.setStatus("CANCELADO");
            return ResponseEntity.ok(pedido);
        } else {
            throw new EntityNotFoundException();
        }
    }

}
