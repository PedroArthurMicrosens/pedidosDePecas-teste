package com.lacamentopeca.pedidosDePecas.services;

import com.lacamentopeca.pedidosDePecas.config.JdbcConfig;
import com.lacamentopeca.pedidosDePecas.domain.pecas.Pecas;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PecasService {
    private JdbcConfig jdbcConfig = new JdbcConfig();
    private final String sql = "select pecas.nome_peca, pecas.COD_PECA_DATASUL, pecas.part_number, pecas.fabricante, pecas.active from pecas ";
    public List<Pecas> executeQuery(String whereClause, Object... params) {
        List<Pecas> pecas = new ArrayList<>();
        String sqlWithWhere = sql + whereClause;

        try (Connection connection = DriverManager.getConnection(jdbcConfig.getUrl(), jdbcConfig.getUser(), jdbcConfig.getPassword());
             PreparedStatement statement = connection.prepareStatement(sqlWithWhere)) {

            for (int i = 0; i < params.length; i++) {
                statement.setObject(i + 1, params[i]);
            }

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Pecas peca = new Pecas();
                    if(resultSet.getBoolean("active")) {
                        peca.setCodPecaDatasul(resultSet.getInt("COD_PECA_DATASUL"));
                        peca.setNomePeca(resultSet.getString("nome_peca"));
                        peca.setPartNumber(resultSet.getString("part_number"));
                        peca.setFabricante(resultSet.getString("fabricante"));
                        pecas.add(peca);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Trate a exceção adequadamente de acordo com sua aplicação
        }

        return pecas;
    }
}
