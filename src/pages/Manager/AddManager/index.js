import React, { useState } from 'react';

import API_URL from '../../../config/api';

import { FiClipboard } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import styles from './styles.module.css';
import { useUserData } from '../../../context/UserData';
import { telephoneMask } from '../../../utils/masks';

export default function AddManager() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  const { headers } = useUserData();

  const options = [
    { value: "admin", label: "Administrador" },
    { value: "manager", label: "Gerente" }
  ];

  function resetFields() {
    setName('');
    setType('');
    setEmail('');
    setTel('');
  }

  async function handleAddManagerSubmit(evt) {
    evt.preventDefault();

    const data = {
      name,
      type: type.value,
      email,
      telephone: tel
    };

    try {
      const response = await API_URL.post('/user', data, { headers });

      resetFields();
    } catch(error) {
      console.log(error);
    }

  }

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiClipboard />
          Cadastrar Gerentes
        </h1>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form onSubmit={handleAddManagerSubmit}>
            <div id={styles.name} className={styles.inputGroup}>
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(evt) => setName(evt.target.value)}                
                placeholder="Seu nome"
                required
              />
            </div>

            <div id={styles.type} className={styles.inputGroup}>
              <label htmlFor="type">Cargo</label>
              <Select 
                options={options}
                id="type"
                name="type"
                placeholder="Escolha o cargo"
                onChange={(evt) => setType(options.find(option => option.value === evt.target.value))}
                value={type}
              />
              
            </div>

            <div id={styles.email} className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}                
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
                onChange={(evt) => setTel(telephoneMask(evt.target.value))}                
                placeholder="(99) 99999-9999"
              />
            </div>

            <div className={styles.btnGroup}>
              <Link to="/managers" className={styles.cancelBtn}>Cancelar</Link>
              <button type="submit" className={styles.submitBtn}>Salvar alterações</button>
            </div>
          </form>
        </div>
      </main>
    </Container>
  );
}