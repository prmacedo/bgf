import React, { useState } from 'react';

import { FiSearch, FiClipboard, FiUserPlus, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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
            <Link to="/addManager" className={styles.btn}><FiUserPlus /></Link>
          </div>
        </div>
        
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Manoel Augusto</td>
                <td>Gerente</td>
                <td>Ativo</td>
                <td className={styles.eyeLink}><Link to="/manager" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>Flávia Carneiro</td>
                <td>Administrador</td>
                <td>Inativo</td>
                <td className={styles.eyeLink}><Link to="/manager" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
}