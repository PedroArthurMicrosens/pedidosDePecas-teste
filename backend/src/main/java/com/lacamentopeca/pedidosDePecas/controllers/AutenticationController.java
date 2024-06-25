package com.lacamentopeca.pedidosDePecas.controllers;

import com.lacamentopeca.pedidosDePecas.config.JdbcConfig;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.CustomPedidoResponse;
import com.lacamentopeca.pedidosDePecas.domain.repositories.UsuariosRepository;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.AutenticationDTO;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.LoginResponseDTO;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.RegisterUsuarios;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.Usuarios;
import com.lacamentopeca.pedidosDePecas.infra.security.TokenService;
import com.lacamentopeca.pedidosDePecas.infra.security.UsernameAlreadyExistsException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("auth")
public class AutenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuariosRepository usuariosRepository;
    @Autowired
    private TokenService tokenService;

    @GetMapping("/all-usuarios")
    public ResponseEntity getAllUsuarios(){
        return new ResponseEntity(usuariosRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<Usuarios> searchUsers(@RequestParam("keyword") String keyword) {
        return usuariosRepository.findByUsernameContaining(keyword);
    }

    @PutMapping("/locked/{id}/{valida}")
    public ResponseEntity lockedAccount(@PathVariable Integer id, @PathVariable Integer valida){
        Optional<Usuarios> optionalUsuarios = usuariosRepository.findById(id);
        if (optionalUsuarios.isPresent()) {
            Usuarios usuarios = optionalUsuarios.get();
            if(valida == 1) {
                boolean nonLocked = true;
                usuarios.setNonLocked(nonLocked);
                usuarios.setNon_locked_name("ATIVO");
                usuariosRepository.save(usuarios);
                return ResponseEntity.ok(usuarios);
            } else if (valida == 0) {
                boolean nonLocked = false;
                usuarios.setNonLocked(nonLocked);
                usuarios.setNon_locked_name("INATIVO");
                usuariosRepository.save(usuarios);
                return ResponseEntity.ok(usuarios);
            }else {
                return ResponseEntity.badRequest().build();
            }
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AutenticationDTO data, HttpServletResponse response){

        try {
            String username = data.getUsername().toLowerCase();
            var usernamePassword = new UsernamePasswordAuthenticationToken(username, data.getPassword());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            if (auth.isAuthenticated()) {
                var usuario = (Usuarios) auth.getPrincipal();
                var token = tokenService.generateToken((Usuarios) auth.getPrincipal());
                var role = usuario.getRole();
                var id = usuario.getId();
                var loginResponseDTO = new LoginResponseDTO(token, username, id, role);
                response.setHeader("Access-Control-Allow-Origin", "*");
                response.addHeader("Authorization", "Bearer " + token);
                return ResponseEntity.ok(loginResponseDTO);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterUsuarios data) {
        try {
            if (this.usuariosRepository.findByUsername(data.username()) != null) {
                throw new UsernameAlreadyExistsException("Username already exists");
            }

            String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
            Usuarios newUsuario = new Usuarios(data.username(), encryptedPassword, data.role());

            this.usuariosRepository.save(newUsuario);

            return ResponseEntity.ok().build();
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
    }

}
