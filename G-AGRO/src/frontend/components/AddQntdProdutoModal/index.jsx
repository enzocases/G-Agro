import { useState, useEffect } from "react"
import { Form, Modal } from "react-bootstrap"
import { atualizarProduto } from "../../api/produtos"
import styles from "./addqntdproduto.module.css"


const AddQntdProdutoModal = ({show, handleAdd, handleClose, produto}) =>{

    const [produtoAtual, setProdutoAtual] = useState({id: "", nome: "", quantidade_minima: "", tipo: "", instrucoes_manejo: "", imagem: "", quantidade_em_estoque: ""})
    const [quantidadeParaAdicionar, setQuantidadeParaAdicionar] = useState(0)

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

    const handleAdicionar = async () =>{
        console.log(produtoAtual.quantidade_em_estoque)
        console.log(quantidadeParaAdicionar)
        const novoProdutoAtual = {
            ...produtoAtual,
            quantidade_em_estoque: Number(produtoAtual.quantidade_em_estoque) + Number(quantidadeParaAdicionar)
        };
        const response = await atualizarProduto(novoProdutoAtual.id, novoProdutoAtual)
        console.log(response)
        if(response){
            handleAdd(quantidadeParaAdicionar)
            handleClose()
            window.location.reload()
        }
    }

    const handleChangeValue = (e) =>{
        setQuantidadeParaAdicionar(e.target.value)
    }

    return(
        <Modal show={show} onHide={handleClose}>
             <Modal.Header className={styles.header}>
                
                <h2 className={styles.title}>{produtoAtual.nome}</h2>
                
            </Modal.Header>
            
            <div className={styles.container}>
            <Modal.Body >
            <div className={styles.infoContainer}>
                <div className={styles.info}>

                <Form.Group>

                    <label className={styles.label}>Quantidade para Adicionar</label>
                    <input className={styles.input} onChange={handleChangeValue} type="number" name="quantidadeParaAdicionar" />

                </Form.Group>
                </div>
                </div>
            </Modal.Body>
            </div>
            
            <Modal.Footer className={styles.footer}>
                <div className={styles.containerBtns}>

                    <button className={styles.btncancel} onClick={handleClose} >Cancelar</button>
                    <button className={styles.btnadd} onClick={handleAdicionar}>Adicionar</button>
                    
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default AddQntdProdutoModal