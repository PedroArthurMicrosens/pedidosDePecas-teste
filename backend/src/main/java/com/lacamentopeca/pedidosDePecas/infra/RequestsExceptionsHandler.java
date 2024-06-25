package com.lacamentopeca.pedidosDePecas.infra;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RequestsExceptionsHandler {
    @ExceptionHandler(EntityNotFoundException.class)
//        public ResponseEntity threat404() {
//        return ResponseEntity.badRequest().body("Dado não encontrado");
//    }
        public ResponseEntity threat409() { return ResponseEntity.badRequest().body("usuário já cadastrado");}
}
