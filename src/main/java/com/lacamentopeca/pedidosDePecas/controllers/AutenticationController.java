package com.lacamentopeca.pedidosDePecas.controllers;

import com.lacamentopeca.pedidosDePecas.domain.repositories.UsuariosRepository;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.AutenticationDTO;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.LoginResponseDTO;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.RegisterUsuarios;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.Usuarios;
import com.lacamentopeca.pedidosDePecas.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AutenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuariosRepository usuariosRepository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AutenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Usuarios) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterUsuarios data){
        if (this.usuariosRepository.findByUsername(data.username()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        Usuarios newUsuario = new Usuarios(data.username(), encryptedPassword, data.role());

        this.usuariosRepository.save(newUsuario);

        return ResponseEntity.ok().build();

    }

}
