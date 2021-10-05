import React from 'react';

import { FiEdit2, FiSettings } from 'react-icons/fi';
import { useState } from 'react/cjs/react.development';

import Container from '../../components/Container';

import styles from './styles.module.css';

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  function handleEditSettings(evt) {
    evt.preventDefault();
  }

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiSettings />
          Configurações
        </h1>
      </header>

      <main className={styles.main}>
        <div className={styles.toolsRow}>
          <button type="button" className={styles.passwordBtn}>Alterar senha</button>
          <button type="button" className={styles.btn}><FiEdit2 /></button>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleEditSettings}>
            <div id={styles.name} className={styles.inputGroup}>
              <label htmlFor="name">Nome completo</label>
              <input 
                type="text"
                name="name"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
                disabled={!isEditing}
                placeholder="Seu nome"
                required
              />
            </div>

            <div id={styles.type} className={styles.inputGroup}>
              {/* Transformar em select */}
              <label htmlFor="type">Cargo</label>
              <input
                type="text"
                name="type"
                value={type}
                onChange={(evt) => setType(evt.target.value)}
                disabled={!isEditing}
                placeholder="Seu cargo"
                required                
              />
            </div>

            <div id={styles.email} className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                disabled={!isEditing}
                placeholder="seu-email@dominio.com"
                required
              />
            </div>

            <div id={styles.tel} className={styles.inputGroup}>
              <label htmlFor="tel">Telefone</label>
              <input
                type="text"
                name="tel"
                value={tel}
                onChange={(evt) => setTel(evt.target.value)}
                disabled={!isEditing}
                placeholder="(99) 99999-9999"
              />
            </div>     

            <div className={`${styles.btnGroup} ${isEditing ? null : styles.hide}`}>
              <button type="button" className={styles.cancelBtn}>Cancelar</button>
              <button type="submit" className={styles.submitBtn}>Salvar alterações</button>
            </div>
          </form>
        </div>
      </main>
    </Container>
  );
}