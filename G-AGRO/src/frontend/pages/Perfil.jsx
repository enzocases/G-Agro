import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../assets/styles/perfil.module.css';
import ModalMessage from "../components/ModalMessage";


const Perfil = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

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
    fetch(`http://localhost:8080/usuarios/${localStorage.getItem('id')}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.profileContainer}>
        <h1>Perfil</h1>
        {profile && (
          <div>
            <p>Nome: {profile.name}</p>
            <p>Email: {profile.email}</p>
            {/* Adicione mais campos conforme necessário */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;