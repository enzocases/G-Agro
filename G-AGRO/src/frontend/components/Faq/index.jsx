import { useState } from 'react';
import styles from './faq.module.css'; 

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.container}>
      <section className={styles.faq}>
        <h2>Perguntas Frequentes (FAQ)</h2>

        <div
          className={`${styles.faqItem} ${activeIndex === 0 ? styles.active : ''}`}
          onClick={() => toggleFaq(0)}
        >
          <h3>Como a G-AGRO pode ajudar minha fazenda?</h3>
     
          {activeIndex === 0 && (
            <p>
              Através de soluções tecnológicas que melhoram a produtividade e otimizam o uso de recursos naturais.
            </p>
          )}
        </div>

        <div
          className={`${styles.faqItem} ${activeIndex === 1 ? styles.active : ''}`}
          onClick={() => toggleFaq(1)}
        >
          <h3>Quais serviços vocês oferecem?</h3>
          {activeIndex === 1 && (
            <p>Oferecemos monitoramento agrícola, automação e suporte técnico especializado.
            </p>
          )}
        </div>

        <div
          className={`${styles.faqItem} ${activeIndex === 2 ? styles.active : ''}`}
          onClick={() => toggleFaq(2)}
        >
          <h3>Como posso entrar em contato?</h3>
          {activeIndex === 2 && (
            <p>
              Você pode nos contatar via WhatsApp, Instagram ou LinkedIn, ou preencher o formulário na seção de Contato.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Faq;