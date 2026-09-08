package com.turismo.projeto_turismo.viagem;

import java.time.LocalDate;

public class Viagem {
    private int id;
    private LocalDate dataIda;
    private LocalDate dataVolta;
    private String partida;
    private String destino;
    private double precoIngresso;
    private int vagas;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public LocalDate getDataIda() { return dataIda; }
    public void setDataIda(LocalDate dataIda) { this.dataIda = dataIda; }

    public LocalDate getDataVolta() { return dataVolta; }
    public void setDataVolta(LocalDate dataVolta) { this.dataVolta = dataVolta; }

    public String getPartida() { return partida; }
    public void setPartida(String partida) { this.partida = partida; }

    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }

    public double getPrecoIngresso() { return precoIngresso; }
    public void setPrecoIngresso(double precoIngresso) { this.precoIngresso = precoIngresso; }

    public int getVagas() { return vagas; }
    public void setVagas(int vagas) { this.vagas = vagas; }
}