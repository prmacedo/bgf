import React, { useState } from 'react';

import { FiPlus, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import styles from './styles.module.css';
import AddressForm from '../../../components/AddressForm';
import API_URL from '../../../config/api';
import { useUserData } from '../../../context/UserData';
import { useEffect } from 'react';

export default function AddClient() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showPartnerInputs, setShowPartnerInputs] = useState(false);
  const [newProject, setNewProject] = useState('');

  const [project, setProject] = useState('');
  const [projects, setProjects] = useState({});

  const [name, setName] = useState('');
  const [nacionality, setNacionality] = useState('');
  const [gender, setGender] = useState('');
  const [maritalState, setMaritalState] = useState('');
  const [profession, setProfession] = useState('');
  const [cpf, setCPF] = useState('');
  const [rg, setRG] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  const [cep, setCEP] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');

  const [partnerName, setPartnerName] = useState('');
  const [partnerNacionality, setPartnerNacionality] = useState('');
  const [partnerGender, setPartnerGender] = useState('');
  const [marriageRegime, setMarriageRegime] = useState('');
  const [partnerProfession, setPartnerProfession] = useState('');
  const [partnerCPF, setPartnerCPF] = useState('');
  const [partnerRG, setPartnerRG] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerTel, setPartnerTel] = useState('');

  const [partnerCEP, setPartnerCEP] = useState('');
  const [partnerStreet, setPartnerStreet] = useState('');
  const [partnerCity, setPartnerCity] = useState('');
  const [partnerUF, setPartnerUF] = useState('');
  const [partnerDistrict, setPartnerDistrict] = useState('');
  const [partnerComplement, setPartnerComplement] = useState('');

  const { headers } = useUserData();

  const maritalStates = [
    { value: 'single', label: 'Solteiro(a)' },
    { value: 'married', label: 'Casado(a)' },
    { value: 'separated', label: 'Separado(a)' },
    { value: 'divorced', label: 'Divorciado(a)' },
    { value: 'widowed', label: 'Viúvo(a)' }
  ];

  const genders = [
    { value: 'F', label: 'Feminino' },
    { value: 'M', label: 'Masculino' }
  ];

  const marriageRegimes = [
    { value: 'separation', label: 'Separação de bens' },
    { value: 'partial', label: 'Comunhão Parcial' },
    { value: 'total', label: 'Comunhão Total' }
  ]

  function resetFields() {
    setProject('');

    setName('');
    setNacionality('');
    setGender('');
    setMaritalState('');
    setProfession('');
    setCPF('');
    setRG('');
    setEmail('');
    setTel('');

    setCEP('');
    setStreet('');
    setCity('');
    setUF('');
    setDistrict('');
    setComplement('');

    setPartnerName('');
    setPartnerNacionality('');
    setPartnerGender('');
    setMarriageRegime('');
    setPartnerProfession('');
    setPartnerCPF('');
    setPartnerRG('');
    setPartnerEmail('');
    setPartnerTel('');

    setPartnerCEP('');
    setPartnerStreet('');
    setPartnerCity('');
    setPartnerUF('');
    setPartnerDistrict('');
    setPartnerComplement('');
  }

  function handleShowPartnerInputs() {
    setShowPartnerInputs(true);
  }

  async function handleAddClient() {
    let partnerId;
    
    if (maritalState.value === 'married') {
      const partnerData = {
        name: partnerName,
        nationality: partnerNacionality,
        gender: partnerGender.value,
        marriageRegime: marriageRegime.value,
        profession: partnerProfession,
        cpf: partnerCPF,
        rg: partnerRG,
        email: partnerEmail,
        telephone: partnerTel,
        cep: partnerCEP,
        street: partnerStreet,
        uf: partnerUF.value,
        city: partnerCity,
        district: partnerDistrict,
        complement: partnerComplement
      }

      try {
        const response = await API_URL.post('/partner', partnerData, { headers });

        partnerId = response.data.id;
        setShowPartnerInputs(false);
      } catch (error) {
        console.log(error);
      }
    }

    const data = {
      projectId: project.value,
      name,
      nationality: nacionality,
      gender: gender.value,
      maritalStatus: maritalState.value,
      profession,
      cpf,
      rg,
      email,
      telephone: tel,
      cep,
      street,
      city,
      uf: uf.value,
      district,
      complement,
      partnerId
    }

    try {
      const response = await API_URL.post('/client', data, { headers });
      
      resetFields();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleAddNewProject() {
    const data = {
      name: newProject
    }
    
    try {
      const response = await API_URL.post('/project', data, { headers });

      const projectItem = {
        value: response.data.id,
        label: response.data.name,
      }

      const projectsList = [...projects, projectItem].sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
      
      setProjects(projectsList);
      setProject(projectItem);

      setNewProject('');
    } catch (error) {
      console.log(error);
    }
    setShowProjectModal(false);
  }

  async function getProjectsList() {
    try {
      const response = await API_URL.get('/projects', { headers });
      const projectList = response.data.map(project => ({
        value: project.id,
        label: project.name
      }));

      setProjects(projectList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <>
      <Container>
        <header className={styles.header}>
          <h1>
            <FiUser />
            Cadastrar Clientes
          </h1>
        </header>

        <main className={styles.main}>
          <div className={styles.formContainer}>
            {!showPartnerInputs 
            ?
            <form>
              <h3>Detalhes do cliente</h3>
              <div className={styles.detailsInputs}>
                <div id={styles.project} className={styles.inputGroup}>
                  <label htmlFor="project">Projeto</label>
                  <Select
                    options={projects}
                    id="project"
                    name="project"
                    value={project}
                    placeholder="Selecione o projeto"                    
                    onChange={(evt) => setProject(projects.find(project => project.value === evt.value))}
                  />
                </div>

                <button
                  type="button"
                  className={styles.outlineBtn}
                  onClick={() => setShowProjectModal(true)}
                >
                  <FiPlus />
                </button>
              </div>

              <h3>Dados pessoais</h3>

              <div className={styles.clientInputs}>
                <div id={styles.name} className={styles.inputGroup}>
                  <label htmlFor="name">Nome completo</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    placeholder="Digite o nome do cliente"
                    required
                  />
                </div>

                <div id={styles.nacionality} className={styles.inputGroup}>
                  <label htmlFor="nacionality">Nacionalidade</label>
                  <input
                    type="text"
                    name="nacionality"
                    value={nacionality}
                    onChange={(evt) => setNacionality(evt.target.value)}
                    placeholder="Digite a nacionalidade"
                    required
                  />
                </div>

                <div id={styles.gender} className={styles.inputGroup}>
                  <label htmlFor="gender">Sexo biológico</label>
                  <Select
                    options={genders}
                    id="gender"
                    name="gender"
                    placeholder="Selecione o sexo"
                    value={gender}
                    onChange={(evt) => setGender(genders.find(gender => gender.value === evt.value))}
                  />
                </div>                

                <div id={styles.profession} className={styles.inputGroup}>
                  <label htmlFor="profession">Profissão</label>
                  <input
                    type="text"
                    name="profession"
                    value={profession}
                    onChange={(evt) => setProfession(evt.target.value)}
                    placeholder="Digite a profissão"
                    required
                  />
                </div>

                <div id={styles.rg} className={styles.inputGroup}>
                  <label htmlFor="rg">RG</label>
                  <input
                    type="text"
                    name="rg"
                    value={rg}
                    onChange={(evt) => setRG(evt.target.value)}
                    placeholder="Digite o RG"
                    required
                  />
                </div>

                <div id={styles.cpf} className={styles.inputGroup}>
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={cpf}
                    onChange={(evt) => setCPF(evt.target.value)}
                    placeholder="Digite o CPF"
                    required
                  />
                </div>

                <div id={styles.maritalState} className={styles.inputGroup}>
                  <label htmlFor="maritalState">Estado Civil</label>
                  <Select
                    options={maritalStates}
                    id="maritalState"
                    name="maritalState"
                    placeholder="Selecione o estado civil"
                    value={maritalState}
                    onChange={(evt) => setMaritalState(maritalStates.find(maritalState => maritalState.value === evt.value))}
                  />
                </div>
              </div>

              <h3>Contato</h3>
              
              <div className={styles.contactInputs}>
                <div id={styles.email} className={styles.inputGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    placeholder="Digite o e-mail"
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
                    placeholder="(99) 99999-9999"
                    required
                  />
                </div>
              </div>

              <AddressForm 
                title={'Endereço'}
                cep={cep}
                setCEP={setCEP}
                street={street}
                setStreet={setStreet}
                city={city}
                setCity={setCity}
                uf={uf}
                setUF={setUF}
                district={district}
                setDistrict={setDistrict}
                complement={complement}
                setComplement={setComplement}
              />

              <div className={styles.btnGroup}>
                <Link to="/clients" className={styles.cancelBtn}>Cancelar</Link>
                {(maritalState.value === 'married')
                ?
                <button 
                  type="button" 
                  className={styles.submitBtn}
                  onClick={() => handleShowPartnerInputs()}
                >
                  Prosseguir
                </button>
                :
                <button type="button" className={styles.submitBtn} onClick={() => handleAddClient()}>
                  Salvar cadastro
                </button>
                }
              </div>
            </form>
            :
            <form>
              <h3>Dados pessoais do cônjuge</h3>

              <div className={styles.clientInputs}>
                <div id={styles.partnerName} className={styles.inputGroup}>
                    <label htmlFor="partnerName">Nome completo</label>
                  <input
                    type="text"
                    name="partnerName"
                    value={partnerName}
                    onChange={(evt) => setPartnerName(evt.target.value)}
                    placeholder="Digite o nome do cliente"
                    required
                  />
                </div>

                <div id={styles.partnerNacionality} className={styles.inputGroup}>
                  <label htmlFor="partnerNacionality">Nacionalidade</label>
                  <input
                    type="text"
                    name="partnerNacionality"
                    value={partnerNacionality}
                    onChange={(evt) => setPartnerNacionality(evt.target.value)}
                    placeholder="Digite a nacionalidade"
                    required
                  />
                </div>

                <div id={styles.partnerGender} className={styles.inputGroup}>
                  <label htmlFor="partnerGender">Sexo biológico</label>
                  <Select
                    options={genders}
                    id="partnerGender"
                    name="partnerGender"
                    placeholder="Selecione o sexo"
                    value={partnerGender}
                    onChange={(evt) => setPartnerGender(genders.find(gender => gender.value === evt.value))}
                  />
                </div>                

                <div id={styles.partnerProfession} className={styles.inputGroup}>
                  <label htmlFor="partnerProfession">Profissão</label>
                  <input
                    type="text"
                    name="partnerProfession"
                    value={partnerProfession}
                    onChange={(evt) => setPartnerProfession(evt.target.value)}
                    placeholder="Digite a profissão"
                    required
                  />
                </div>

                <div id={styles.partnerRG} className={styles.inputGroup}>
                  <label htmlFor="partnerRG">RG</label>
                  <input
                    type="text"
                    name="partnerRG"
                    value={partnerRG}
                    onChange={(evt) => setPartnerRG(evt.target.value)}
                    placeholder="Digite o RG"
                    required
                  />
                </div>

                <div id={styles.partnerCPF} className={styles.inputGroup}>
                  <label htmlFor="partnerCPF">CPF</label>
                  <input
                    type="text"
                    name="partnerCPF"
                    value={partnerCPF}
                    onChange={(evt) => setPartnerCPF(evt.target.value)}
                    placeholder="Digite o CPF"
                    required
                  />
                </div>

                <div id={styles.marriageRegime} className={styles.inputGroup}>
                  <label htmlFor="marriageRegime">Regime de Casamento</label>
                  <Select
                    options={marriageRegimes}
                    id="marriageRegime"
                    name="marriageRegime"
                    placeholder="Selecione o regime de casamento"
                    value={marriageRegime}
                    onChange={(evt) => setMarriageRegime(marriageRegimes.find(marriageRegime => marriageRegime.value === evt.value))}
                  />
                </div>
              </div>

              <h3>Contato</h3>

              <div className={styles.contactInputs}>
                <div id={styles.partnerEmail} className={styles.inputGroup}>
                  <label htmlFor="partnerEmail">E-mail</label>
                  <input
                    type="partnerEmail"
                    name="partnerEmail"
                    value={partnerEmail}
                    onChange={(evt) => setPartnerEmail(evt.target.value)}
                    placeholder="Digite o e-mail"
                    required
                  />
                </div>

                <div id={styles.partnerTel} className={styles.inputGroup}>
                  <label htmlFor="partnerTel">Telefone</label>
                  <input
                    type="text"
                    name="partnerTel"
                    value={partnerTel}
                    onChange={(evt) => setPartnerTel(evt.target.value)}
                    placeholder="(99) 99999-9999"
                    required
                  />
                </div>
              </div>

              <AddressForm 
                title={'Endereço do cônjuge'}
                cep={partnerCEP}
                setCEP={setPartnerCEP}
                street={partnerStreet}
                setStreet={setPartnerStreet}
                city={partnerCity}
                setCity={setPartnerCity}
                uf={partnerUF}
                setUF={setPartnerUF}
                district={partnerDistrict}
                setDistrict={setPartnerDistrict}
                complement={partnerComplement}
                setComplement={setPartnerComplement}
              />

              <div className={styles.btnGroup}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowPartnerInputs(false)}  
                >
                  Voltar
                </button>
                
                <button type="button" className={styles.submitBtn} onClick={() => handleAddClient()}>
                  Salvar cadastro
                </button>                
              </div>
            </form>
            }
          </div>
        </main>
      </Container>

      <div id="newProjectModal" className={`${styles.modalContainer} ${showProjectModal ? null : styles.hide}`}>
        <div className={styles.modal}>
          <h2>Cadastrar novo projeto</h2>

          <div className={styles.modalContent}>
            <form>
              <div id={styles.newProject} className={styles.inputGroup}>
                <label htmlFor="newProject">Projeto</label>
                <input
                  type="text"
                  name="newProject"
                  value={newProject}
                  onChange={(evt) => setNewProject(evt.target.value)}
                  placeholder="Digite o nome do projeto"
                  required
                />
              </div>

              <div className={styles.modalGroupBtn}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowProjectModal(false)}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={() => handleAddNewProject()}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}