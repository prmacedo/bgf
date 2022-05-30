import React, { useState } from 'react';
import { useEffect } from 'react';

import { FiSearch, FiBriefcase, FiUserPlus, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import Container from '../../../components/Container';

import API_URL from '../../../config/api';
import { useUserData } from '../../../context/UserData';

import styles from './styles.module.css';

export default function AssigneeList() {
  const [search, setSearch] = useState('');
  const [assigneeList, setAssigneeList] = useState([]);
  const [loading, setLoading] = useState(true)

  const { headers } = useUserData();

  async function handleSearch(evt) {
    evt.preventDefault();
    setLoading(true)

    try {
      const response = await API_URL.get(`/assignees/${search}`, { headers });

      setAssigneeList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  async function getAssignees() {
    try {
      const response = await API_URL.get('/assignees', { headers });

      console.log(response);
      setAssigneeList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAssignees();
  }, []);

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
          {
          loading ?
          <div className={styles.circularProgress}>
            <CircularProgress color="inherit" size={96} />
          </div>
          :          
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
              {
                assigneeList.length ?
                assigneeList.map(assignee => (                  
                  <tr key={assignee.id}>
                    <td>{assignee.name}</td>
                    <td>{assignee.cnpj}</td>
                    <td>{assignee.email}</td>
                    <td>{assignee.telephone}</td>
                    <td>
                      <div className={styles.eyeLink}>
                        <Link to={`/assignee/${assignee.id}`} title="Clique para visualizar"><FiEye /></Link>
                      </div>
                    </td>
                  </tr>
                )) :
                <div className={styles.emptyList}>
                  Não há registros
                </div>
              }
            </tbody>
          </table>
          }
        </div>
      </main>
    </Container>
  );
}