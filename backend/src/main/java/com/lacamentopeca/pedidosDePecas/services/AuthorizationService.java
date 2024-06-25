package com.lacamentopeca.pedidosDePecas.services;

import com.lacamentopeca.pedidosDePecas.domain.repositories.UsuariosRepository;
import com.lacamentopeca.pedidosDePecas.domain.usuarios.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    private UsuariosRepository usuariosRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuariosRepository.findByUsername(username);
    }

    public List<Usuarios> searchUsers(String keyword) {
        return usuariosRepository.findByUsernameContaining(keyword);
    }

    public Integer obterIdPorNomeDeUsuario(String username) {
        Usuarios user = (Usuarios) usuariosRepository.findByUsername(username);
        if (user != null) {
            return user.getId();
        }
        return null;
    }

}
