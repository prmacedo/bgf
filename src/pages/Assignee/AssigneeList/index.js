import React, { useState } from 'react';

import { FiSearch, FiBriefcase, FiUserPlus, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';

import styles from './styles.module.css';

export default function AssigneeList() {
  const [search, setSearch] = useState('');

  function handleSearch(evt) {
    evt.preventDefault();
  }

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiBriefcase />
          Cessionários
        </h1>
      </header>

      <main className={styles.main}>
        <div className={styles.toolsRow}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              placeholder="Digite o nome ou CNPJ"
            />

            <button className={styles.btn}>
              <FiSearch />
            </button>
          </form>

          <div className={styles.btnGroup}>
            <Link to="/addAssignee" className={styles.btn}><FiUserPlus /></Link>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Cessionário 01</td>
                <td>98.599.748/0001-57</td>
                <td>cessionario@gmail.com</td>
                <td>(71) 99999-9999</td>
                <td className={styles.eyeLink}><Link to="/assignee" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>Flávia Carneiro</td>
                <td>29.585.533/0001-64</td>
                <td>contato@gmail.com</td>
                <td>(71) 99111-1111</td>
                <td className={styles.eyeLink}><Link to="/assignee" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
}