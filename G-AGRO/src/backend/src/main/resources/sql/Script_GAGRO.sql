  CREATE TABLE IF NOT EXISTS usuario(
  id SERIAL PRIMARY KEY, 
  nome VARCHAR(100) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cargo VARCHAR(10) NOT NULL CHECK(cargo IN('admin', 'employee'))
  );
    
  CREATE TABLE IF NOT EXISTS terreno(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  status VARCHAR(15) NOT NULL CHECK(status IN('ocupado', 'desocupado',  'Em_Descanso')) DEFAULT 'desocupado',
  tamanho DOUBLE PRECISION NOT NULL, 
  tipo_solo VARCHAR(50) NOT NULL
  );
    
  CREATE TABLE IF NOT EXISTS cultura(
  id SERIAL PRIMARY KEY,
  nomeCultura VARCHAR(100) NOT NULL,
  tempoPlantio INT DEFAULT 0,
  tipo VARCHAR(100) NOT NULL, 
  imagem TEXT,
  descricao TEXT
  );



  CREATE TABLE IF NOT EXISTS plantio (
    id SERIAL PRIMARY KEY,
    id_cultura INT NOT NULL,
    id_terreno INT NOT NULL,
    dataPlantio DATE NOT NULL,
    UNIQUE (id_cultura, id_terreno, dataPlantio),
    FOREIGN KEY (id_cultura) REFERENCES cultura(id) ON DELETE RESTRICT,
    FOREIGN KEY (id_terreno) REFERENCES terreno(id) ON DELETE RESTRICT
  );

  CREATE TABLE IF NOT EXISTS colheita(
  id SERIAL PRIMARY KEY,
  dataInicio DATE NOT NULL,
  dataTermino DATE NOT NULL,
  condicao TEXT, 
  sacas INT NOT NULL, 
  aprovacao VARCHAR(15) CHECK(aprovacao IN('aprovado', 'reprovado')) DEFAULT 'aprovado',
  feedback TEXT,
  id_cultura INT,
  id_terreno INT,
  FOREIGN KEY (id_cultura) REFERENCES cultura(id) ON DELETE RESTRICT,
  FOREIGN KEY (id_terreno) REFERENCES terreno(id) ON DELETE RESTRICT
  );

  CREATE TABLE IF NOT EXISTS acaoCorretiva(
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  id_colheita INT NOT NULL,
  FOREIGN KEY (id_colheita) REFERENCES colheita(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS evento(
  id SERIAL PRIMARY KEY,
  tipoEvento VARCHAR(15) DEFAULT NULL
    CHECK(tipoEvento IN('colheita', 'plantio')),
  id_plantio INT,
  id_colheita INT,
  id_usuario INT,
  FOREIGN KEY (id_plantio) REFERENCES plantio(id) ON DELETE CASCADE,
  FOREIGN KEY (id_colheita) REFERENCES colheita(id) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
  );
    
  CREATE TABLE IF NOT EXISTS lembrete(
  id SERIAL PRIMARY KEY,
  descricao TEXT,
  dataLembrete DATE NOT NULL,
  status VARCHAR(70) NOT NULL
    CHECK(status IN('Realizado', 'Pendente', 'EmProgresso')),
  id_usuario INT,
  id_evento INT DEFAULT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES evento(id) ON DELETE CASCADE
  );
    
  CREATE TABLE IF NOT EXISTS fornecedor(
  CNPJ CHAR(14) PRIMARY KEY,
  nome VARCHAR(50) NOT NULL, 
  paisOrigem VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS produto(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL, 
  quantidadeMinima INT DEFAULT 0,
  tipo VARCHAR(50) NOT NULL
    CHECK(tipo IN('Sementes', 'Agrotoxicos', 'Fertilizantes', 'Inoculantes', 'Substratos', 'Biopesticidas')),
  instrucoesManejo TEXT,
  quantidadeEmEstoque INT DEFAULT 0,
  imagem TEXT
  );  
    
  CREATE TABLE IF NOT EXISTS fornecimento(
  id SERIAL PRIMARY KEY,
  quantidadeFornecida INT NOT NULL CHECK(quantidadeFornecida > 0),
  id_produto INT NOT NULL,
  id_fornecedor CHAR(14) NOT NULL,
  FOREIGN KEY (id_produto) REFERENCES produto(id) ON DELETE CASCADE,
  FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(CNPJ)
  );
    
  CREATE TABLE IF NOT EXISTS consumo_produto(
  id SERIAL PRIMARY KEY,
  quantidadeConsumida INT NOT NULL, 
  dataConsumo DATE NOT NULL,
  id_usuario INT,
  id_produto INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_produto) REFERENCES produto(id) ON DELETE CASCADE
  );







