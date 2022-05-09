import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import Alert from '../../components/CustomAlert';
import CircularProgress from '@mui/material/CircularProgress';

import { useUserData  } from '../../context/UserData';

import API_URL from '../../config/api';

import styles from './styles.module.css';

import BGF1 from '../../assets/BGF1.png';
import BGF2 from '../../assets/BGF2.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const history = useHistory();

  const { login } = useUserData();

  async function handleLogin(evt) {
    evt.preventDefault();

    setLoading(true);

    try {
      const response = await API_URL.post('/authenticate', {
        email,
        password
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      login();
      history.push('/clients');
    } catch (error) {
      switch (error.response.status) {
        case 422:
          setMessage("Usuário não encontrado, ou dados inválidos!")
          break;

        case 403:
          setMessage("Acesso do usuário bloqueado. Fale com um administrador!")
          break;
      
        default:
          setMessage("Erro ao executar o login!")
          break;
      }
      
      setOpen(true)
      console.log(error.response);
    } finally {
      setLoading(false)
    }
  }

  return(
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={BGF2} alt="Logo BGF" className={styles.logo} />
      </div>

      <main className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.logoContainerMobile}>
            <img src={BGF1} alt="Logo BGF" className={styles.logoMobile} />
          </div>

          <h1>Faça o seu login</h1>

          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite o seu e-mail"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </div>
            
            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {
                loading &&
                <CircularProgress color="inherit" size={16} />
              }
              Entrar
            </button>

            <Alert
              severity="error"
              message={message}
              variant="filled"
              open={open}
              setOpen={setOpen}
            />
          </form>
        </div>
      </main>
    </div>
  );
}