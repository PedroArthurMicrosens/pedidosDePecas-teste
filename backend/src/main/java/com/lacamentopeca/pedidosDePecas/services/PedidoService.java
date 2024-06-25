package com.lacamentopeca.pedidosDePecas.services;

import com.lacamentopeca.pedidosDePecas.config.JdbcConfig;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.CustomPedidoResponse;
import com.lacamentopeca.pedidosDePecas.domain.pedidos.Pedidos;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PedidosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {

    private final PedidosRepository pedidosRepository;

    @Autowired
    public PedidoService(PedidosRepository pedidosRepository) {
        this.pedidosRepository = pedidosRepository;
    }

    private JdbcConfig jdbcConfig = new JdbcConfig();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public List<Pedidos> getAllPedidos() {
        return pedidosRepository.findAll();
    }

    private final String sql = "SELECT p.id AS id_pedido, pe.COD_PECA_DATASUL, pe.nome_peca, pe.part_number, p.ordem_servico, " +
            "p.data_pedidos, p.data_pedidos_fechamento, u.username AS usuarios_abertura, us.username AS usuarios_fechamento, " +
            "pe.fabricante, p.status " +
            "FROM pedidos p " +
            "JOIN pecas pe ON p.peca_id = pe.id " +
            "JOIN usuarios u ON p.usuarios_id_abertura = u.id " +
            "LEFT JOIN usuarios us ON p.usuarios_id_fechamento = us.id ";

    public List<CustomPedidoResponse> executeQuery(String whereClause, Object... params) {
        List<CustomPedidoResponse> pedidos = new ArrayList<>();
        String sqlWithWhere = sql + whereClause;

        try (Connection connection = DriverManager.getConnection(jdbcConfig.getUrl(), jdbcConfig.getUser(), jdbcConfig.getPassword());
             PreparedStatement statement = connection.prepareStatement(sqlWithWhere)) {

            for (int i = 0; i < params.length; i++) {
                statement.setObject(i + 1, params[i]);
            }

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    CustomPedidoResponse pedido = new CustomPedidoResponse();
                    pedido.setId_pedido(resultSet.getInt("id_pedido"));
                    pedido.setCOD_PECA_DATASUL(resultSet.getInt("COD_PECA_DATASUL"));
                    pedido.setNome_peca(resultSet.getString("nome_peca"));
                    pedido.setPart_number(resultSet.getString("part_number"));
                    pedido.setFabricante(resultSet.getString("fabricante"));
                    pedido.setOrdem_servico(resultSet.getInt("ordem_servico"));
                    pedido.setData_pedidos(resultSet.getTimestamp("data_pedidos").toLocalDateTime());
                    pedido.setStatus(resultSet.getString("status"));
                    if (resultSet.getString("data_pedidos_fechamento") != null) {
                        String data_fechamentoString = resultSet.getString("data_pedidos_fechamento");
                        LocalDateTime data_fechamento = LocalDateTime.parse(data_fechamentoString.substring(0, 19), formatter);
                        String dataFormatada = formatter.format(data_fechamento);
                        pedido.setData_fechamento(dataFormatada);
                    }
                    pedido.setUsuarios_abertura(resultSet.getString("usuarios_abertura"));
                    pedido.setUsuarios_fechamento(resultSet.getString("usuarios_fechamento"));
                    pedidos.add(pedido);

                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            //TODO: Tratar exceções
        }

        return pedidos;
    }

}

