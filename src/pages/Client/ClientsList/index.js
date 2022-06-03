import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FiFilter, FiSearch, FiUpload, FiUser, FiUserPlus, FiEye } from 'react-icons/fi';

import Container from '../../../components/Container';
import Select from '../../../components/Select';
import CircularProgress from '@mui/material/CircularProgress';


import { useUserData } from '../../../context/UserData';

import API_URL from '../../../config/api';

import styles from './styles.module.css';

import cancelFilter from '../../../assets/icons/filter-cancel.svg';

export default function ClientsList() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [advancedSearch, setAdvancedSearch] = useState(false);

  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');

  const [clientList, setClientList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const { headers } = useUserData();

  const statusList = [
    {value: '1', label: "Prospecção/Precificação"},
    {value: '2', label: "Proposta Enviada Proposta Recebida"},
    {value: '3', label: "Contrato Digitalizado - Enviado"},
    {value: '4', label: "Contrato Digitalizado - Recebido"},
    {value: '5', label: "Análise - Diligência de Certidões"},
    {value: '6', label: "Pendência"},
    {value: '7', label: "Procuração e Contrato em Cartório"},
    {value: '8', label: "Escritura de Cessão"},
    {value: '9', label: "Desembolso"},
    {value: '10', label:"Via Física Enviada"}
  ];

  function formatName(name) {
    const nameArray = name.split(' ');

    if (nameArray.length > 1)
      return `${nameArray[0]} ${nameArray[nameArray.length - 1]}`;
    
    return nameArray[0];
  }

  function handleSearch(evt) {
    evt.preventDefault();
  }

  async function getClientList() {
    try {
      const response = await API_URL.get('/clients');
      setClientList(response.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  async function getProjects() {
    try {
      const response = await API_URL.get('/projects');
     
      let projectList = [];

      if (response.data.length) {
        projectList = response.data.map(project => ({
          value: project.id,
          label: project.name
        }));
      }

      setProjectList(projectList);
    } catch (error) {
      console.log(error);
    }
  }

  async function exportCSV() {
    try{
      await API_URL.get('/export/csv')
        .then((response) => {
          console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Clientes.csv`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });

    } catch (error) {
      console.log(error);
    }
  }

  async function simpleFilter() {
    setLoading(true)
    try {
      const response = await API_URL.get(`/clients/${search}`);
      
      console.log(response);
      setClientList(response.data);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function advancedFilter() {
    const filterName = name || undefined;
    const filterProject = project.value || undefined;
    const filterStatus = status.value || undefined;

    setLoading(true)

    console.log(filterName);
    console.log(filterProject);
    console.log(filterStatus);
    try {
      const response = await API_URL.get(`/clients/${filterName}/${filterProject}/${filterStatus}`);
      setClientList(response.data);
      console.log(response);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function resetAdvancedSearch(){
    setName('');
    setProject('');
    setStatus('');
  }

  useEffect(() => {
    getClientList();
    getProjects();

    
  }, []);

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

            <button 
              className={styles.btn}
              onClick={() => simpleFilter()}
              disabled={loading}
            >
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
            <button type="button" className={styles.btn} onClick={() => exportCSV()}><FiUpload /></button>
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

              <div className={styles.inputGroup}>
                <label htmlFor="project">Projeto</label>
                <Select
                  options={projectList}
                  id="project"
                  name="project"
                  value={project}
                  placeholder="Selecione o projeto"
                  onChange={(evt) => setProject(projectList.find(project => project.value === evt.value))}
                />
              </div>

              {/* Transformar em Select depois */}
              <div className={styles.inputGroup}>
                <label htmlFor="status">Status</label>
                <Select
                    options={statusList}
                    value={status}
                    id="status"
                    name="status"
                    placeholder="Selecione o status"
                    onChange={(evt) => setStatus(statusList.find(status => status.value === evt.value))}
                  />
              </div>
            </div>

            <div className={styles.btnGroup}>
              <button 
                type="button" 
                className={styles.btn}
                onClick={() => advancedFilter()}
                disabled={loading}
              >
                <FiSearch />
              </button>
              <button
                type="button" 
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={() => resetAdvancedSearch()}
              >
                <img src={cancelFilter} alt="Cancelar filtros" />
              </button>
            </div>
          </form>
        </div>

        <div className={styles.tableContainer}>

        {
          loading ?          
          <div className={styles.circularProgress}>
            <CircularProgress color="inherit" size={96} />
          </div>
          :
          clientList.length ?
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
              {clientList.map(client => (
                <tr key={ client.id }>
                  <td>{ formatName(client.name) }</td>
                  <td>{ client.project.name }</td>
                  <td>{ statusList.find(status => status.value === client.status).label }</td>
                  <td>{client._count.attachments}</td>
                  <td>
                    <div className={styles.eyeLink}>
                      <Link to={`/client/${ client.id }`} title="Clique para visualizar"><FiEye /></Link>
                    </div>
                  </td>
                </tr>
              )) }
            </tbody> 
          </table>            
          : 
          <div className={styles.emptyList}>
            Não há registros
          </div>
        }

        </div>
      </main>


    </Container>
  );
}