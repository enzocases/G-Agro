import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './modalEditProduto.module.css';
//import { carregarprodutos } from '../../api/produtos';
import ModalMessage from '../ModalMessage';

const ModalEditProduto = ({ show, handleClose, produto, handleSave }) => {
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [formData, setFormData] = useState({id: "", nome: "", quantidade_minima: "", tipo: "", instrucoes_manejo: "", imagem: "", quantidade_em_estoque: ""})

    useEffect(() => {
        // Verifica se há uma mensagem no sessionStorage
        const storedMessage = sessionStorage.getItem('modalMessage');
        if (storedMessage) {
          setModalMessage(storedMessage);
          setIsModalMessageVisible(true);
    
          // Remove a mensagem do sessionStorage após 4 segundos
          setTimeout(() => {
            setIsModalMessageVisible(false);
            sessionStorage.removeItem('modalMessage'); // Remove a mensagem para não exibir novamente
          }, 3000);
        }
      }, []);

    useEffect(() => {
      if(produto){
        console.log(produto)
        setFormData({
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        console.log(formData)
        handleSave(formData); // Passa uma cópia do formData atual
        handleClose();
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={styles.blockTitle}>
                <Modal.Title className={styles.title}>Editar produto</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.container}>
                <Form>
                    <Form.Group controlId="formNomeProduto">
                        <Form.Label className={styles.label}>Nome do Produto</Form.Label>
                        <input
                             className={styles.input}
                             name="nome"
                             value={formData.nome}
                             onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDataquantidade_minima">
                        <Form.Label className={styles.label}>Quantidade minima: </Form.Label>
                        <input
                             className={styles.input}
                             name="quantidade_minima"
                             value={formData.quantidade_minima}
                             onChange={handleChange}
                        ></input>
                    </Form.Group>
                    
                    <Form.Group controlId="formProductType">
                      <Form.Label className={styles.label}>Tipo do Produto: </Form.Label>
                        <select 
                                className={styles.select}
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                        >
                                <option className={styles.option} value="">Selecione o tipo de produto</option>
                                <option className={styles.option} value="Sementes">Sementes</option>
                                <option className={styles.option} value="Agrotoxicos">Agrotóxicos</option>
                                <option className={styles.option} value="Fertilizantes">Fertilizantes</option>
                                <option className={styles.option} value="Inoculantes">Inoculantes</option>
                                <option className={styles.option} value="Substratos">Substratos</option>
                                <option className={styles.option} value="Biopesticidas">Biopesticidas</option>
                        </select>
                    </Form.Group>
                    <Form.Group controlId="formInstrucoes">
                        <Form.Label className={styles.label}>Instruções de manejo: </Form.Label>
                        <input
                            className={styles.input}
                            name="instrucoes_manejo" 
                            value={formData.instrucoes_manejo} 
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formQuantidadeEstoque">
                        <Form.Label className={styles.label}>Quantidade em estoque: </Form.Label>
                        <input 
                            className={styles.input}
                            name="quantidade_em_estoque" 
                            value={formData.quantidade_em_estoque} 
                            onChange={handleChange}
                        />
                    
                    </Form.Group>
                    <Form.Group controlId="formQntdEstoque">
                        <Form.Label className={styles.label}>Imagem (URL) </Form.Label>
                        <input className={styles.input} type="text" placeholder="Coloque a url da imagem" name="imagem" onChange={handleChange} value={formData.imagem} />
                    </Form.Group>
                  
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
            <div className={styles.containerBtns}>
                        <button className={styles.btnclose} onClick={handleClose}>
                            Cancelar
                        </button>
                        <button className={styles.btnedit} onClick={() => handleSubmit()}>
                            Salvar
                        </button>
                    </div>
                    <ModalMessage 
                        message={sessionStorage.getItem("modalMessage")}
                        show={isModalMessageVisible}
                    />
            </Modal.Footer>
        </Modal>
        
    );
};

export default ModalEditProduto;