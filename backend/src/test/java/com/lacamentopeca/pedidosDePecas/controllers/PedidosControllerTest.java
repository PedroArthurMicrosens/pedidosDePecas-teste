package com.lacamentopeca.pedidosDePecas.controllers;

import com.lacamentopeca.pedidosDePecas.domain.pecas.Pecas;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.CustomPedidoResponse;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.Pedidos;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.RequestPedidos;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PecasRepository;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PedidosRepository;
import com.lacamentopeca.pedidosDePecas.services.AuthorizationService;
import com.lacamentopeca.pedidosDePecas.services.PedidoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class PedidosControllerTest {

    @Mock
    private PedidosRepository repository;

    @Mock
    private AuthorizationService userService;

    @Mock
    private PecasRepository pecasRepository;

    @Mock
    private PedidoService pedidoService;

    @InjectMocks
    private PedidosController pedidosController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllPedidos() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString())).thenReturn(expectedPedidos);

        ResponseEntity result = pedidosController.getAllPedidos();

        assertEquals(ResponseEntity.ok(expectedPedidos), result);
    }

    @Test
    void testGetPedidosByStatus() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), any())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByStatus("status");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByStatusAndStatus() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), any(), any())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByStatusAndStatus("status1", "status2");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByIdAndStatus() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyInt(), any())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByIdAndStatus(1, "status");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByCodAndStatus() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyInt(), any())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByCodAndStatus(1, "status");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByNameAndStatus() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyString(), any())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByNameAndStatus("name", "status");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByPartnumberAndStatus() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyString(), any())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByPartnumberAndStatus("partnumber", "status");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByOsAndStatus() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyInt(), any())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByOsAndStatus(1, "status");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidoById() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyInt())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidoById(1);

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByCod() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyInt())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByCod(1);

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByName() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyString())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByName("name");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByPartnumber() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyString())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByPartnumber("partnumber");

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testGetPedidosByOs() {
        CustomPedidoResponse response = new CustomPedidoResponse();
        List<CustomPedidoResponse> expectedPedidos = Collections.singletonList(response);

        when(pedidoService.executeQuery(anyString(), anyInt())).thenReturn(expectedPedidos);

        List<CustomPedidoResponse> result = pedidosController.getPedidosByOs(1);

        assertEquals(expectedPedidos, result);
    }

    @Test
    void testRegisterPedido() {
        RequestPedidos requestPedidos = mock(RequestPedidos.class);
        when(requestPedidos.id()).thenReturn(1);
        when(requestPedidos.usuarios_id_abertura()).thenReturn(1);

        Pedidos pedido = new Pedidos(requestPedidos);
        Pecas pecas = mock(Pecas.class);
        when(pecas.getActive()).thenReturn(true);
        when(pecasRepository.findById(anyInt())).thenReturn(Optional.of(pecas));
        when(repository.save(any(Pedidos.class))).thenReturn(pedido);

        ResponseEntity result = pedidosController.registerPedido(requestPedidos);

        assertEquals(ResponseEntity.ok().build(), result);
    }

    @Test
    void testUpdatePedido() {
        Pedidos pedido = new Pedidos();
        when(repository.findById(anyInt())).thenReturn(Optional.of(pedido));
        when(userService.obterIdPorNomeDeUsuario(anyString())).thenReturn(1);

        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("user");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResponseEntity result = pedidosController.updatePedido(1);

        assertEquals(ResponseEntity.ok(pedido), result);
    }

    @Test
    void testUpdatePedidoFat() {
        Pedidos pedido = new Pedidos();
        when(repository.findById(anyInt())).thenReturn(Optional.of(pedido));

        ResponseEntity result = pedidosController.updatePedidoFat(1);

        assertEquals(ResponseEntity.ok(pedido), result);
    }

    @Test
    void testCancelPedido() {
        Pedidos pedido = new Pedidos();
        when(repository.findById(anyInt())).thenReturn(Optional.of(pedido));
        when(userService.obterIdPorNomeDeUsuario(anyString())).thenReturn(1);

        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("user");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResponseEntity result = pedidosController.cancelPedido(1);

        assertEquals(ResponseEntity.ok(pedido), result);
    }
}
