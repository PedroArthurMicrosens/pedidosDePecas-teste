package com.lacamentopeca.pedidosDePecas.domain.usuarios;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name = "usuarios")
@Entity(name = "usuarios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Usuarios implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuarios_seq")
    @SequenceGenerator(name = "usuarios_seq", sequenceName = "usuarios_seq", allocationSize = 1)
    private Integer id;
    private String username;
    private String password;
    private UserRoles role;

    public Usuarios(String username, String password, UserRoles role){
        this.username = username;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRoles.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"), new SimpleGrantedAuthority("ROLE_TECNICO"));
        else if (this.role == UserRoles.SUPERTECNICO) return List.of(new SimpleGrantedAuthority("ROLE_TECNICO"), new SimpleGrantedAuthority("ROLE_USER"));
        else if (this.role == UserRoles.TECNICO) return List.of(new SimpleGrantedAuthority("ROLE_TECNICO"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
