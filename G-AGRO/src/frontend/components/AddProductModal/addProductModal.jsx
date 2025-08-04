import { useState } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import styles from "./addProductModal.module.css"

const AddProductModal = ({show, handleClose, handleAdd}) => {

    const [newProduct, setNewProduct] = useState({
        nome: "",
        quantidade_minima: "",
        tipo: "",
        instrucoes_manejo: "",
        quantidade_em_estoque: "",
        imagem: "",
    })

    const handleChange = (e) =>{
        const {name, value} = e.target
        setNewProduct({...newProduct, [name]: value})
    }

    const handleSubmit = () =>{
        handleAdd(newProduct)
        handleClose();
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={styles.blockTitle}>
                <Modal.Title className={styles.title}>Adicionar Novo Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.container}>
                <Form>
                    <Form.Group controlId="formProductName">
                        <Form.Label className={styles.label}>Nome do Produto: </Form.Label>
                        <input className={styles.input} type="text" placeholder="Digite o nome do produto:" name="nome" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formQntdMinima">
                        <Form.Label className={styles.label}>Quantidade Mínima: </Form.Label>
                        <input className={styles.input} type="number" placeholder="Digite a quantidade mínima no estoque:" name="quantidade_minima" onChange={handleChange}/>
                    </Form.Group>
                   <Form.Group controlId="formProductType">
                   <Form.Label className={styles.label}>Tipo do Produto: </Form.Label>
                   <Form.Select
                             className={styles.select}
                             name="tipo"
                             value={newProduct.tipo}
                             onChange={handleChange}
                        >
                            <option className={styles.option} value="">Selecione o tipo de produto</option>
                            <option className={styles.option} value="Sementes">Sementes</option>
                            <option className={styles.option} value="Agrotoxicos">Agrotóxicos</option>
                            <option className={styles.option} value="Fertilizantes">Fertilizantes</option>
                            <option className={styles.option} value="Inoculantes">Inoculantes</option>
                            <option className={styles.option} value="Substratos">Substratos</option>
                            <option className={styles.option} value="Biopesticidas">Biopesticidas</option>
                    </Form.Select>
                   </Form.Group>
                    <Form.Group controlId="formInstructions">
                        <Form.Label className={styles.label}>Instruções de Manejo: </Form.Label>
                        <textarea 
                        className={styles.input} 
                        placeholder="Descreva as instruções de uso, cuidados e recomendações de manejo..." 
                        name="instrucoes_manejo" 
                        onChange={handleChange}
                        rows="4"
                        />
                    </Form.Group>
                    <Form.Group controlId="formQntdEstoque">
                        <Form.Label className={styles.label}>Quantidade em Estoque: </Form.Label>
                        <input className={styles.input} type="number" placeholder="Digite a quantidade do produto no estoque:" name="quantidade_em_estoque" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formQntdEstoque">
                        <Form.Label className={styles.label}>Imagem (URL) </Form.Label>
                        <input className={styles.input} type="text" placeholder="Coloque a url da imagem" name="imagem" onChange={handleChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
                <button className={styles.btnclose} onClick={handleClose}>
                    Cancelar
                </button>
                <button className={styles.btnedit} onClick={handleSubmit}>
                    Salvar Produto
                </button>
            </Modal.Footer>

        </Modal>
    )

}

export default AddProductModal;