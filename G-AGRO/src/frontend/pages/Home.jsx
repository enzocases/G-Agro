import Navbar from "../components/Navbar";
import styles from "../assets/styles/home.module.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import UserFoto from "../assets/imgs/user.png";
import SobreFoto from "../assets/imgs/banner4.png";
import FAQ from "../components/Faq";
import ModalMessage from "../components/ModalMessage";
import { useEffect } from "react";
import img2 from "../assets/imgs/beneficio1.jpg";
import img1 from "../assets/imgs/beneficio3.jpg";
import img3 from "../assets/imgs/beneficio2.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className={styles.main}>
      <header>
        <Navbar className={styles.navbar}></Navbar>
      </header>

      {/* Secao Banner */}
      <section className={styles.banner} id={styles.containerBanner} data-aos="fade-in">
        <div className={styles.container}>
          <h1>Bem-vindo à G-AGRO</h1>
          <hr />
          <p>- Transformando a Agricultura com Inovação e Tecnologia -</p>

        </div>
      </section>

      {/* Secao Beneficios */}
      <div className={styles.secaoBeneficios}>
        <div className={styles.container} data-aos="fade-up">
          <h2 className={styles.tituloSecao}>O que você pode Ganhar?</h2>
          <div className={styles.beneficioItem} data-aos="zoom-in-up">
            <div className={styles.texto}>
              <span className={styles.subtitulo}>Eficiência no Campo</span>
              <p>
                Nossos produtos e serviços ajudam a aumentar a produtividade e reduzir custos operacionais, trazendo maior eficiência para suas operações agrícolas.
              </p>
              <button className={styles.botao}>Saiba mais</button>
            </div>
            <img className={styles.img} src={img1} alt="Eficiência no Campo" />
          </div>

          <div className={styles.beneficioItem} data-aos="zoom-in-up">
            <div className={styles.texto}>
              <span className={styles.subtitulo}>Monitoramento Inteligente</span>
              <p>
                Oferecemos soluções tecnológicas para monitorar as condições das plantações em tempo real, ajudando na tomada de decisões precisas.
              </p>
              <button className={styles.botao}>Saiba mais</button>
            </div>
            <img className={styles.img} src={img2} alt="Monitoramento Inteligente" />
          </div>

          <div className={styles.beneficioItem} data-aos="zoom-in-up">
            <div className={styles.texto}>
              <span className={styles.subtitulo}>Sustentabilidade</span>
              <p>
                Promovemos práticas agrícolas sustentáveis que não apenas aumentam a eficiência, mas também preservam o meio ambiente para as futuras gerações.
              </p>
              <button className={styles.botao}>Saiba mais</button>
            </div>
            <img className={styles.img} src={img3} alt="Sustentabilidade" />
          </div>
        </div>
      </div>

      {/* Secao Depoimentos */}
      <div className={styles.secaoDepoimento} data-aos="fade-up">
        <div className={styles.containerDepoimentos}>
          <section className={styles.depoimentos}>
            <h2 className={styles.titleDepoimentos}>O que nossos clientes dizem</h2>

            <div className={styles.clientes}>
              <div className={styles.cliente} data-aos="flip-left">
                <div className={styles.depoimentoTop}>
                  <p className={styles.clienteText}>
                    "A G-AGRO mudou a forma como gerenciamos nossa produção. A
                    tecnologia deles é essencial para o nosso crescimento."
                  </p>
                </div>
                <div className={styles.depoimentoBottom}>
                  <img className={styles.clienteImg} src={UserFoto} alt="João Silva" />

                  <div className={styles.descricaoCliente}>
                    <h3 className={styles.h3}>João Silva</h3>
                    <span>Responsável pela Produção | AgroTech</span>
                    <div className={styles.notaAvaliacao}>
                      <FontAwesomeIcon
                        icon={faStar}
                        className={styles.star}
                      />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cliente} data-aos="flip-left">

                <div className={styles.depoimentoTop}>
                  <p className={styles.clienteText}>
                    "Com o suporte técnico e as ferramentas da G-AGRO, conseguimos
                    aumentar nossa eficiência em 30%!"
                  </p>
                </div>
                <div className={styles.depoimentoBottom}>
                  <img className={styles.clienteImg} src={UserFoto} alt="Maria Souza" />
                  <div className={styles.descricaoCliente}>
                    <h3 className={styles.h3}>Maria Souza</h3>
                    <span>Supervisora de Operações | AgroGreen</span>
                    <div className={styles.notaAvaliacao}>
                      <FontAwesomeIcon
                        icon={faStar}
                        className={styles.star}
                      />
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cliente} data-aos="flip-left">
                <div className={styles.depoimentoTop}>
                  <p className={styles.clienteText}>
                    "Com o suporte técnico e as ferramentas da G-AGRO, conseguimos
                    aumentar nossa eficiência em 30%!"
                  </p>
                </div>
                <div className={styles.depoimentoBottom}>
                  <img className={styles.clienteImg} src={UserFoto} alt="Maria Souza" />
                  <div className={styles.descricaoCliente}>
                    <h3 className={styles.h3}>Maria Souza</h3>
                    <span>Supervisora de Operações | AgroGreen</span>
                    <div className={styles.notaAvaliacao}>
                      <FontAwesomeIcon
                        icon={faStar}
                        className={styles.star}
                      />
                      <span>5.0</span>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Secao Sobre */}
      <div className={styles.container}>
        <section className={styles.sobre} data-aos="fade-left">
          <img src={SobreFoto} alt="Sobre a G-AGRO" />
          <div>
            <h2>Sobre a G-AGRO</h2>
            <p>
              Somos uma empresa especializada em soluções agrícolas inovadoras,
              oferecendo tecnologia de ponta para aumentar a produtividade e
              promover a sustentabilidade no setor.
            </p>
            <button className={styles.sobreButton}>Conheça mais</button>
          </div>
        </section>
        <hr />
      </div>

      {/* Secao FAQ */}
      <FAQ />

      {/* Secao Contato(Rodapé) */}
      <Footer />
    </div>
  );
}
