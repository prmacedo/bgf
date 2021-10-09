import React, { useState } from 'react';

import { FiSearch, FiClipboard, FiUserPlus } from 'react-icons/fi';

import Container from '../../../components/Container';

import styles from './styles.module.css';

export default function ManagerList() {
  const [search, setSearch] = useState('');

  function handleSearch(evt) {
    evt.preventDefault();
  }

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiClipboard />
          Gerentes
        </h1>
      </header>

      <main className={styles.main}>
        <div className={styles.toolsRow}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              placeholder="Digite o nome ou cargo"
            />

            <button className={styles.btn}>
              <FiSearch />
            </button>
          </form>

          <div className={styles.btnGroup}>            
            <button type="button" className={styles.btn}><FiUserPlus /></button>
          </div>
        </div>
        
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Manoel Augusto</td>
                <td>Gerente</td>
                <td>Ativo</td>
              </tr>

              <tr>
                <td>Flávia Carneiro</td>
                <td>Administrador</td>
                <td>Inativo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
}