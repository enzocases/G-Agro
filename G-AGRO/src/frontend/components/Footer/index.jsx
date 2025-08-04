import React from 'react';
import styles from './footer.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";



const Footer = () =>{
    return (
        <footer className={styles.footer}>
            
            <p>&copy; 2024 G-AGRO. Todos os direitos reservados.</p>
            <div className={styles.container}>

                <div className={styles.social_links}>

                    <div className={styles.social_links_item}>
                    <FontAwesomeIcon icon={faWhatsapp} className={styles.icone} />
                <a href="https://api.whatsapp.com/send?phone=31975374896" target="_blank" rel="noopener noreferrer">
                    Whatsapp
                </a>
                </div>

                <div className={styles.social_links_item}>
                <FontAwesomeIcon icon={faInstagram} className={styles.icone} />
                <a href="https://instagram.com/reis__biel" target="_blank" rel="noopener noreferrer">
                    Instagram
                </a>

                </div>

                <div className={styles.social_links_item}>
                <FontAwesomeIcon icon={faLinkedin} className={styles.icone} />
                <a href="https://linkedin.com/in/seu_usuario" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
                </div>

                </div>
            </div>
        </footer>
    )
} 

export default Footer