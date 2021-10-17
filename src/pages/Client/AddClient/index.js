import React, { useState } from 'react';

import { FiPlus, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import styles from './styles.module.css';

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
  const [partnerMaritalState, setPartnerMaritalState] = useState('');
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

  const ufs = [
    { value: "AC", label: "AC" },
    { value: "AL", label: "AL" },
    { value: "AP", label: "AP" },
    { value: "AM", label: "AM" },
    { value: "BA", label: "BA" },
    { value: "CE", label: "CE" },
    { value: "DF", label: "DF" },
    { value: "ES", label: "ES" },
    { value: "GO", label: "GO" },
    { value: "MA", label: "MA" },
    { value: "MT", label: "MT" },
    { value: "MS", label: "MS" },
    { value: "MG", label: "MG" },
    { value: "PA", label: "PA" },
    { value: "PB", label: "PB" },
    { value: "PR", label: "PR" },
    { value: "PE", label: "PE" },
    { value: "PI", label: "PI" },
    { value: "RJ", label: "RJ" },
    { value: "RN", label: "RN" },
    { value: "RS", label: "RS" },
    { value: "RO", label: "RO" },
    { value: "RR", label: "RR" },
    { value: "SC", label: "SC" },
    { value: "SP", label: "SP" },
    { value: "SE", label: "SE" },
    { value: "TO", label: "TO" }
  ];

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

  function handleSearchCEP() {
    // Chamar API de CEP
  }

  function handleShowPartnerInputs() {
    setShowPartnerInputs(true);
  }

  function handleAddClientSubmit(evt) {
    // evt.preventDefault();
  }
  
  function handleAddNewProject(evt) {
    evt.preventDefault();
    setShowProjectModal(false);
  }

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
            <form onSubmit={handleAddClientSubmit}>
              <h3>Detalhes do cliente</h3>
              <div className={styles.detailsInputs}>
                <div id={styles.project} className={styles.inputGroup}>
                  <label htmlFor="project">Projeto</label>
                  <Select
                    options={projects}
                    id="project"
                    name="project"
                    placeholder="Selecione o projeto"
                    onChange={(evt) => setProject(evt.value)}
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
                    onChange={(evt) => setGender(evt.value)}
                  />
                </div>

                <div id={styles.maritalState} className={styles.inputGroup}>
                  <label htmlFor="maritalState">Estado Civil</label>
                  <Select
                    options={maritalStates}
                    id="maritalState"
                    name="maritalState"
                    placeholder="Selecione o estado civil"
                    onChange={(evt) => setMaritalState(evt.value)}
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

              <h3>Endereço</h3>

              <div className={styles.addressInputs}>
                <div className={styles.cepGroup}>
                  <div id={styles.cep} className={styles.inputGroup}>
                    <label htmlFor="cep">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      value={cep}
                      onChange={(evt) => setCEP(evt.target.value)}
                      placeholder="Digite o CEP"
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.outlineBtn}
                    onClick={() => handleSearchCEP()}
                  >
                    Buscar pelo CEP
                  </button>
                </div>

                <div className={styles.addressGroup}>
                  <div id={styles.street} className={styles.inputGroup}>
                    <label htmlFor="street">Logradouro</label>
                    <input
                      type="text"
                      name="street"
                      value={street}
                      onChange={(evt) => setStreet(evt.target.value)}
                      placeholder="Digite o Logradouro"
                    />
                  </div>

                  <div id={styles.city} className={styles.inputGroup}>
                    <label htmlFor="city">Cidade</label>
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={(evt) => setCity(evt.target.value)}
                      placeholder="Digite a cidade"
                    />
                  </div>

                  <div id={styles.uf} className={styles.inputGroup}>
                    <label htmlFor="uf">UF</label>
                    <Select
                      options={ufs}
                      id="uf"
                      name="uf"
                      placeholder="--"
                      onChange={(evt) => setUF(evt.value)}
                    />
                  </div>

                  <div id={styles.district} className={styles.inputGroup}>
                    <label htmlFor="district">Bairro</label>
                    <input
                      type="text"
                      name="district"
                      value={district}
                      onChange={(evt) => setDistrict(evt.target.value)}
                      placeholder="Digite o bairro"
                    />
                  </div>

                  <div id={styles.complement} className={styles.inputGroup}>
                    <label htmlFor="complement">Complemento</label>
                    <input
                      type="text"
                      name="complement"
                      value={complement}
                      onChange={(evt) => setComplement(evt.target.value)}
                      placeholder="Digite o complemento"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.btnGroup}>
                <Link to="/clients" className={styles.cancelBtn}>Cancelar</Link>
                {(maritalState === 'married')
                ?
                <button 
                  type="button" 
                  className={styles.submitBtn}
                  onClick={() => handleShowPartnerInputs()}
                >
                  Prosseguir
                </button>
                :
                <button type="submit" className={styles.submitBtn}>
                  Salvar cadastro
                </button>
                }
              </div>
            </form>
            :
            <form onSubmit={handleAddClientSubmit}>
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
                    onChange={(evt) => setPartnerGender(evt.value)}
                  />
                </div>

                <div id={styles.partnerMaritalState} className={styles.inputGroup}>
                  <label htmlFor="partnerMaritalState">Estado Civil</label>
                  <Select
                    options={maritalStates}
                    id="partnerMaritalState"
                    name="partnerMaritalState"
                    placeholder="Selecione o estado civil"
                    onChange={(evt) => setPartnerMaritalState(evt.value)}
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

              <h3>Endereço</h3>

              <div className={styles.addressInputs}>
                <div className={styles.cepGroup}>
                  <div id={styles.partnerCEP} className={styles.inputGroup}>
                    <label htmlFor="partnerCEP">CEP</label>
                    <input
                      type="text"
                      name="partnerCEP"
                      value={partnerCEP}
                      onChange={(evt) => setPartnerCEP(evt.target.value)}
                      placeholder="Digite o CEP"
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.outlineBtn}
                    onClick={() => handleSearchCEP()}
                  >
                    Buscar pelo CEP
                  </button>
                </div>

                <div className={styles.addressGroup}>
                  <div id={styles.partnerStreet} className={styles.inputGroup}>
                    <label htmlFor="partnerStreet">Logradouro</label>
                    <input
                      type="text"
                      name="partnerStreet"
                      value={partnerStreet}
                      onChange={(evt) => setPartnerStreet(evt.target.value)}
                      placeholder="Digite o Logradouro"
                    />
                  </div>

                  <div id={styles.partnerCity} className={styles.inputGroup}>
                    <label htmlFor="partnerCity">Cidade</label>
                    <input
                      type="text"
                      name="partnerCity"
                      value={partnerCity}
                      onChange={(evt) => setPartnerCity(evt.target.value)}
                      placeholder="Digite a cidade"
                    />
                  </div>

                  <div id={styles.partnerUF} className={styles.inputGroup}>
                    <label htmlFor="partnerUF">UF</label>
                    <Select
                      options={ufs}
                      id="partnerUF"
                      name="partnerUF"
                      placeholder="--"
                      onChange={(evt) => setPartnerUF(evt.value)}
                    />
                  </div>

                  <div id={styles.partnerDistrict} className={styles.inputGroup}>
                    <label htmlFor="partnerDistrict">Bairro</label>
                    <input
                      type="text"
                      name="partnerDistrict"
                      value={partnerDistrict}
                      onChange={(evt) => setPartnerDistrict(evt.target.value)}
                      placeholder="Digite o bairro"
                    />
                  </div>

                  <div id={styles.partnerComplement} className={styles.inputGroup}>
                    <label htmlFor="partnerComplement">Complemento</label>
                    <input
                      type="text"
                      name="partnerComplement"
                      value={partnerComplement}
                      onChange={(evt) => setPartnerComplement(evt.target.value)}
                      placeholder="Digite o complemento"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.btnGroup}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowPartnerInputs(false)}  
                >
                  Voltar
                </button>
                
                <button type="submit" className={styles.submitBtn}>
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
            <form action=""
              onSubmit={handleAddNewProject}
            >
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
                  type="submit"
                  className={styles.submitBtn}
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