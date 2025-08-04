import styles from "./consumoProduto.module.css";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { cadastrarConsumo } from "../../api/consumo";
import { atualizarProduto } from "../../api/produtos";

export default function ModalConsumoProduto({
  produto,
  onClose,
  onConsumir,
  show,
}) {
  const [quantidadeConsumida, setQuantidadeConsumida] = useState(0);
  const [data_consumo, setDataConsumo] = useState("");
  const [produtoAtual, setProdutoAtual] = useState({id: "", nome: "", quantidade_minima: "", tipo: "", instrucoes_manejo: "", imagem: "", quantidade_em_estoque: ""})

  useEffect(() => {
    if(produto){
      
      setProdutoAtual({
          id: produto.id,
          nome: produto.nome,
          quantidade_minima: produto.quantidade_minima,
          tipo: produto.tipo,
          instrucoes_manejo: produto.instrucoes_manejo,
          quantidade_em_estoque: produto.quantidade_em_estoque,
          imagem: produto.imagem,
      });
    }
  }, [produto]);

  const handleChangeQuantidade = (e) => {
    setQuantidadeConsumida(e.target.value);
  };

  const handleChangeData = (e) => {
    setDataConsumo(e.target.value);
  };

  const handleConsumir = async () => {
    const dadosConsumo = {
      produto_id: produtoAtual.id,
      quantidade_consumida: quantidadeConsumida,
      data_consumo: data_consumo,
    };

    console.log(dadosConsumo)

    const resultado = await cadastrarConsumo(dadosConsumo);
    
      produtoAtual.quantidade_em_estoque -= quantidadeConsumida

      console.log("Quantidade conumida: ", quantidadeConsumida)
      console.log("Dados do Produto: ", produtoAtual.id, produtoAtual)
      const produtoAtualizado = await atualizarProduto(produtoAtual.id, produtoAtual)
      if(produtoAtualizado){
        onConsumir(quantidadeConsumida); 
        onClose(); 
      }
    
  };


  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className={styles.header}>
        <h3 className={styles.h3}>{produto?.nome}</h3>

      </Modal.Header>

      <div className={styles.container}>
        <Modal.Body>
          <div className={styles.qntdEmEstoque}>
            <p>Quantidade em Estoque: {produto?.quantidade_em_estoque}</p>
          </div>
          <div className={styles.info}>
            <div className={styles.rangerContainer}>
              <Form.Group>
                <Form.Label>Quantidade a consumir: </Form.Label>
                <span className={styles.quantidadeDisplay}>
                  {quantidadeConsumida}
                </span>
                <input
                  type="range"
                  min="0"
                  max={produto?.quantidade_em_estoque || 0}
                  value={quantidadeConsumida}
                  onChange={handleChangeQuantidade}
                  className={styles.rangeInput}
                />
              </Form.Group>
            </div>
            <div className={styles.dataContainer}>
              <label className={styles.label}>Data de Consumo:</label>
              <input
                type="date"
                name="data_consumo"
                value={data_consumo}
                onChange={handleChangeData}
                className={styles.input}
              />
            </div>
          </div>
        </Modal.Body>
      </div>

      <Modal.Footer className={styles.footer}>
        <div className={styles.containerBtns}>
          <button onClick={onClose} className={styles.btnclose}>
            Cancelar
          </button>
          <button onClick={handleConsumir} className={styles.btnconsumo}>
            Consumir
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}