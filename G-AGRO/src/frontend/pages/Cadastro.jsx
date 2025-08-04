import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../assets/styles/cadastro.module.css'
import banner from '../assets/imgs/banner1.png'
import { createUser, loginUser } from '../api/usuarios';
import ModalMessage from "../components/ModalMessage";



const SignUp = () =>{
    const [isLogin, setIsLogin] = useState(true)
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: '',
        role: '',
    });

    const [errors, setErrors] = useState({
        nome: '',
        email: '',
        senha: '',
        role: '',
    })

    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState("")

    useEffect(() => {

        const storedMessage = sessionStorage.getItem("modalMessage");
        if (storedMessage) {
          setModalMessage(storedMessage);
          setIsModalMessageVisible(true);
    
          // Remove a mensagem do sessionStorage após 4 segundos
          setTimeout(() => {
            setIsModalMessageVisible(false);
            sessionStorage.removeItem("modalMessage"); // Remove a mensagem para não exibir novamente
          }, 3000);
        }
      }, []);

    const validateFields = () =>{
        let newErrors ={}
        if(!usuario.nome && !isLogin) newErrors.nome = 'Nome é obrigatório!'
        if(!usuario.email) newErrors.email = 'Email é obrigatório!'
        if(!usuario.senha) newErrors.senha = 'Senha é obrigatório!'
        if(!usuario.role) newErrors.role = 'Cargo é obrigatório!'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const resetFields = () =>{
        setUsuario({
            nome: '',
            email: '',
            senha: '',
            role: '',
        })

        setErrors({
            nome: '',
            email: '',
            senha: '',
            role: '',
        })
    }

    const toggleForm = () => {
        resetFields()
        setIsLogin(!isLogin)
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario, [name]: value
        }))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!validateFields()){
            return;
        }

        if(isLogin){
            try{
                const usuarioLogado = await loginUser(usuario)
                if(usuarioLogado){
                    console.log(usuarioLogado)
                    localStorage.setItem("id", usuarioLogado.id)
                    sessionStorage.setItem('modalMessage', 'Login realizado com sucesso!')
                }else{
                    sessionStorage.setItem('modalMessage', 'Usuário não encontrado')
                }
            }catch(error){
                console.error(error)
            }
           
        }else{
            createUser(usuario)
            .then(response =>{
                console.log(response)
                sessionStorage.setItem('modalMessage', 'Usuário cadastrado.')
                resetFields()
            })
            .catch(error =>{
                console.error("Erro ao cadastrar usuário", error)
                sessionStorage.setItem('modalMessage', 'Erro ao cadastrar usuário')
            })
         }
    }


    return (
        <div>
            <ModalMessage 
             message={sessionStorage.getItem("modalMessage")}
             show={isModalMessageVisible}
            />
            <Navbar></Navbar>
            <div className={styles.container}>
                <div className={`${styles.formWrapper} ${isLogin ? styles.login : styles.signup}`}>
                    {isLogin ? (
                        <div className='front'>
                            <h2>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <input value={usuario.email} onChange={handleChange} name='email' type="email" placeholder='Email' />
                                {errors.email && <p className={`${styles.errorMessage} ${styles.showError}`}>{errors.email}</p>}
                                <input value={usuario.senha} onChange={handleChange} name='senha' type="password" placeholder='Senha' />
                                {errors.senha && <p className={`${styles.errorMessage} ${styles.showError}`}>{errors.senha}</p>}
                                <select onChange={handleChange} name="role" id="position" className='selectPosition' value={usuario.role} >
                                    <option value="" disabled>Selecione uma opção</option>
                                    <option value="admin">Administrador</option>
                                    <option value="employee">Funcionário</option>
                                </select>
                                {errors.role && <p className={`${styles.errorMessage} ${styles.showError}`}>{errors.role}</p>}
                                <button type='submit'>Entrar</button>
                            </form>
                            <div className="text">
                                <p onClick={toggleForm}>Não possui uma conta?</p>
                                <p onClick={toggleForm}>Cadastre-se Aqui!</p>
                            </div>
                        </div>
                    ):(
                        <div className='back'>
                            <h2>Cadastrar</h2>
                            <form onSubmit={handleSubmit}>
                                <input value={usuario.nome} onChange={handleChange} name='nome' type="text" placeholder='Nome' />
                                {errors.nome && <p className={`${styles.errorMessage} ${styles.showError}`}>{errors.nome}</p>}
                                <select onChange={handleChange} name="role" id="position" className='selectPosition' value={usuario.role} >
                                    <option value="" disabled>Selecione uma opção</option>
                                    <option value="admin">Administrador</option>
                                    <option value="employee">Funcionário</option>
                                </select>
                                {errors.role && <p className={`${styles.errorMessage} ${styles.showError}`}>{errors.role}</p>}
                                <input value={usuario.email} onChange={handleChange} name='email' type="email" placeholder='Email' />
                                {errors.email && <p className={`${styles.errorMessage} ${styles.showError}`}>{errors.email}</p>}
                                <input value={usuario.senha} onChange={handleChange} name='senha' type="password" placeholder='Senha' />
                                {errors.senha && <p className={`${styles.errorMessage} ${styles.showError}`}>{errors.senha}</p>}
                                <button type='submit'>Cadastrar</button>
                            </form>
        
                            <div className='text'>
                                <p onClick={toggleForm}>Já tem uma conta?</p>
                                <p onClick={toggleForm}>Faça o Login Aqui!</p>
                            </div>

                        </div>
                    )}
                </div>
                
                <div className={`${styles.banner} ${isLogin ? styles.bannerInactive : styles.bannerActive}` }>
                    <img className='bannerImg' src={banner} alt="" />
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default SignUp
