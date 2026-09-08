
CREATE TABLE IF NOT EXISTS viagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_ida DATE,
    data_volta DATE,
    partida VARCHAR(40) NOT NULL,
    destino VARCHAR(40) NOT NULL,
    preco_ingresso DOUBLE NOT NULL,
    vagas INT NOT NULL
    );







