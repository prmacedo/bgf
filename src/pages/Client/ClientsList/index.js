import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FiFilter, FiSearch, FiUpload, FiUser, FiUserPlus, FiEye } from 'react-icons/fi';

import Container from '../../../components/Container';

import styles from './styles.module.css';

import cancelFilter from '../../../assets/icons/filter-cancel.svg';

export default function ClientsList() {
  const [search, setSearch] = useState('');

  const [advancedSearch, setAdvancedSearch] = useState(false);

  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');

  function handleSearch(evt) {
    evt.preventDefault();
  }

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiUser />
          Clientes
        </h1>
      </header>

      <main className={styles.main}>
        <div className={styles.toolsRow}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              placeholder="Digite o nome do cliente ou projeto"
            />

            <button className={styles.btn}>
              <FiSearch />
            </button>
          </form>
          
          <div className={styles.btnGroup}>
            <button
              type="button"
              className={`${styles.btn} ${advancedSearch ? styles.active : null}`}
              onClick={() => setAdvancedSearch(!advancedSearch)}
            >
              <FiFilter />
            </button>
            <button type="button" className={styles.btn}><FiUpload /></button>
            <Link to="/addClient" className={styles.btn}><FiUserPlus /></Link>
          </div>
        </div>

        <div id={styles.filterSettingsId} className={advancedSearch ? null : styles.hidden}>
          <h2>Filtrar</h2>

          <form className={styles.advancedSearch}>
            <div className={styles.formContent}>
              {/* Ver se vou transformar em Select depois */}
              <div className={styles.inputGroup}>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                  placeholder="Escolha um nome"
                />
              </div>

              {/* Transformar em Select depois */}
              <div className={styles.inputGroup}>
                <label htmlFor="project">Projeto</label>
                <input
                  type="text"
                  name="project"
                  value={project}
                  onChange={(evt) => setProject(evt.target.value)}
                  placeholder="Escolha o projeto"
                />
              </div>

              {/* Transformar em Select depois */}
              <div className={styles.inputGroup}>
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  name="status"
                  value={status}
                  onChange={(evt) => setStatus(evt.target.value)}
                  placeholder="Escolha o status"
                />
              </div>
            </div>

            <div className={styles.btnGroup}>
              <button type="submit" className={styles.btn}><FiSearch /></button>
              <button type="button" className={`${styles.btn} ${styles.cancelBtn}`}>
                <img src={cancelFilter} alt="Cancelar filtros" />
              </button>
            </div>
          </form>
        </div>

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Projetos</th>
                <th>Status</th>
                <th>Nº de anexos</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>

              <tr>
                <td>José Freitas</td>
                <td>Projeto 01</td>
                <td>Prospecção/Precificação</td>
                <td>5</td>
                <td className={styles.eyeLink}><Link to="/client" title="Clique para visualizar"><FiEye /></Link></td>
              </tr>
            </tbody>
          </table>

        </div>
      </main>


    </Container>
  );
}