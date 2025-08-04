import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from "./style.module.css";

const CultureCard = ({ culture, onClick }) => {
    return (
        <Card className={styles.card}>
            <Card.Img variant="top" src={culture.imagem} alt={culture.nomecultura} />

            <Card.Body>
                <Card.Title className={styles.cardTittle}>{culture.nomecultura} </Card.Title>
                <Card.Text className={styles.cardText}>
                    {culture.descricao}
                </Card.Text>
                
                <div className="d-flex justify-content-center">
                    <Button variant="success" className={styles.customGreenButton} onClick={onClick}>
                        Visualizar
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CultureCard;
