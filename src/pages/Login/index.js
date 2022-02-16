import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import API_URL from '../../config/api';

import styles from './styles.module.css';

import BGF1 from '../../assets/BGF1.png';
import BGF2 from '../../assets/BGF2.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const history = useHistory();

  async function handleLogin(evt) {
    evt.preventDefault();

    try {
      const response = await API_URL.post('/authenticate', {
        email,
        password
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      history.push('/clients');
    } catch (error) {
      console.log(error);
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

            <button type="submit" className={styles.loginBtn}>Entrar</button>
            {/* <div className={styles.forgotPassword}>
              <Link to="/forgotPassword">Esqueci minha senha</Link>
            </div> */}
          </form>
        </div>
      </main>
    </div>
  );
}