import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import styles from './styles.module.css';

import BGF1 from '../../assets/BGF1.png';
import BGF2 from '../../assets/BGF2.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={BGF2} alt="Logo BGF" className={styles.logo} />
      </div>

      <main className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.logoContainerMobile}>
            <img src={BGF1} alt="Logo BGF" className={styles.logoMobile} />
          </div>

          <h1>Recuperar senha</h1>

          <form action="">
            <div className={styles.inputGroup}>
              <label htmlFor="email">Insira o seu email e enviaremos um <br/> novo acesso a sua conta</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite o seu e-mail"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>

            <button type="submit" className={styles.loginBtn}>Recuperar acesso</button>
            <div className={styles.forgotPassword}>
              <FiArrowLeft />
              <Link to="/">Voltar</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}