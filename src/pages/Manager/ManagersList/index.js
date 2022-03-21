import React, { useState } from 'react';
import { useEffect } from 'react';

import { FiSearch, FiClipboard, FiUserPlus, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import API_URL from '../../../config/api';
import { useUserData } from '../../../context/UserData';

import styles from './styles.module.css';

export default function ManagerList() {
  const [search, setSearch] = useState('');
  const [managerList, setManagerList] = useState([]);

  const { headers, user } = useUserData();

  const { id } = user.user;

  const options = [
    { value: "admin", label: "Administrador" },
    { value: "manager", label: "Gerente" }
  ];

  async function handleSearch(evt) {
    evt.preventDefault();
    // const filter = options.find(option => option.label.toLowerCase().includes(search.toLowerCase())).value
    const filter = options.find(option => option.label.toLowerCase() === search.toLowerCase())?.value || search

    try {
      const response = await API_URL.get(`/users/${id}/${filter}`, { headers });
      setManagerList(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getManagers() {
    try {
      const response = await API_URL.get(`/users/${id}`, { headers });
      setManagerList(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getManagers();
  }, []);

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

            <button 
              type='submit'
              className={styles.btn}
            >
              <FiSearch />
            </button>
          </form>

          { user.user.type === 'admin' &&
          <div className={styles.btnGroup}>            
            <Link to="/addManager" className={styles.btn}><FiUserPlus /></Link>
          </div>
          }
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
              {
                managerList.length ?
                managerList.map(manager => (
                  <tr key={manager.id}>
                    <td>{manager.name}</td>
                    <td>{manager.type === "admin" ? "Administrador" : "Gerente"}</td>
                    <td>{manager.active ? "Ativo" : "Inativo"}</td>
                    <td className={styles.eyeLink}><Link to={`/manager/${manager.id}`} title="Clique para visualizar"><FiEye /></Link></td>
                  </tr>                  
                )) :
                <div className={styles.emptyList}>
                  Não há registros
                </div>
              }
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
}