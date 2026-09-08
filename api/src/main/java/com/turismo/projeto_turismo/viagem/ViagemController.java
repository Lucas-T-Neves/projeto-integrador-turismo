package com.turismo.projeto_turismo.viagem;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/viagens")
public class ViagemController {

    private final JdbcTemplate jdbcTemplate;

    public ViagemController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Viagem> inserir(@RequestBody Viagem viagem) {
        if (verificaCampos(viagem)) {
            return ResponseEntity.badRequest().build();
        }
        if (verificaExists(viagem)) {
            return ResponseEntity.status(409).build();
        }

        String sql = "INSERT INTO viagem (data_ida, data_volta, partida, destino, preco_ingresso, vagas) VALUES (?, ?, ?, ?, ?, ?)";
        KeyHolder key = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setDate(1, Date.valueOf(viagem.getDataIda()));
            ps.setDate(2, Date.valueOf(viagem.getDataVolta()));
            ps.setString(3, viagem.getPartida());
            ps.setString(4, viagem.getDestino());
            ps.setDouble(5, viagem.getPrecoIngresso());
            ps.setInt(6, viagem.getVagas());
            return ps;
        }, key);

        viagem.setId(key.getKey().intValue());
        return ResponseEntity.status(201).body(viagem);
    }

    // READ
    @GetMapping
    public ResponseEntity<List<Viagem>> listar() {
        String sql = "SELECT * FROM viagem";
        List<Viagem> resultado = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Viagem.class));
        return ResponseEntity.ok(resultado);
    }




    // verificacao

    public Boolean verificaExists(Viagem v) {
        String sql = "SELECT * FROM viagem WHERE data_ida = ? AND data_volta = ? AND partida = ? AND destino = ? AND preco_ingresso = ?";
        List<Viagem> resultado = jdbcTemplate.query(sql,
                BeanPropertyRowMapper.newInstance(Viagem.class),
                Date.valueOf(v.getDataIda()),
                Date.valueOf(v.getDataVolta()),
                v.getPartida(),
                v.getDestino(),
                v.getPrecoIngresso());
        return !resultado.isEmpty();
    }

    public boolean verificaCampos(Viagem v) {
        if (v == null) return true;
        if (v.getPartida() == null || v.getPartida().trim().isEmpty()) return true;
        if (v.getDestino() == null || v.getDestino().trim().isEmpty()) return true;
        if (v.getPartida().trim().length() > 40 || v.getDestino().trim().length() > 40) return true;
        if (v.getDataIda() == null) return true;
        if (v.getDataVolta() == null) return true;
        if (v.getPrecoIngresso() <= 0.0) return true;
        if (v.getVagas() <= 0) return true;
        if (v.getDataVolta().isBefore(v.getDataIda())) return true;
        return false;
    }
}
