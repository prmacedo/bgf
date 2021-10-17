import React, { useState } from 'react';

import { FiEdit2, FiUser, FiPlus, FiTrash2 } from 'react-icons/fi';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import styles from './styles.module.css';

import cancelEdit from '../../../assets/icons/cancel-edit.svg';

export default function EditClient() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelEditModal, setShowCancelEditModal] = useState(false);
  const [showSaveEditModal, setShowSaveEditModal] = useState(false);

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

  const options = [
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

  function handleEditClient(evt) {
    evt.preventDefault();

    // Fecha modal e desabilita edição
    setShowSaveEditModal(false);
    setIsEditing(false);

    console.log(evt.target);
  }

  function handleConfirmDeletion() {
    setShowDeleteModal(false);
  }

  function handleConfirmEdition() {
    setShowEditModal(false);
    setIsEditing(true);
  }

  function handleConfirmCancelEdition() {
    setShowCancelEditModal(false);
    setIsEditing(false);

    // Reset inputs
  }

  function validateFields() {
    // if (name  && email) {
      setShowSaveEditModal(true);
    // }
  }

  function toggleFieldError(inputValue, inputName) {
    if (!inputValue) {
      document.querySelector(`#editForm #${inputName}`).classList.add(`${styles.invalidField}`);
      document.querySelector(`#editForm #${inputName} + small`).classList.remove(`${styles.hide}`);
    } else {
      document.querySelector(`#editForm #${inputName}`).classList.remove(`${styles.invalidField}`);
      document.querySelector(`#editForm #${inputName} + small`).classList.add(`${styles.hide}`);
    }
  }

  function handleSearchCEP() {
    // Chamar API de CEP
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
            Cliente
          </h1>
        </header>

        <main className={styles.main}>
          <div className={styles.toolsRow}>
            <div className={styles.options}>
              <button
                type="button"
                className={styles.outlineBtn}
                disabled={isEditing}
              >
                Gerar Proposta
              </button>

              <button
                type="button"
                className={styles.outlineBtn}
                disabled={isEditing}
              >
                Gerar Contrato
              </button>

              <button
                type="button"
                className={styles.outlineBtn}
                disabled={isEditing}
              >
                Anexos
              </button>

            </div>

            <div className={styles.btnGroup}>
              {isEditing
                ?
                <>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.redBtn}`}
                    onClick={() => setShowCancelEditModal(true)}
                  >
                    <img src={cancelEdit} alt="Cancelar edição" />
                  </button>
                </>
                :
                <>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => setShowEditModal(true)}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.redBtn}`}
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <FiTrash2 />
                  </button>
                </>
              }
            </div>
          </div>

          <div className={styles.formContainer}>
            <form id="editForm" onSubmit={handleEditClient}>
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
                    disabled={!isEditing}
                  />
                </div>

                <button
                  type="button"
                  className={styles.outlineBtn}
                  disabled={!isEditing}
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
                    id="name"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o nome do cliente"
                    required
                  />
                  <small className={styles.hide}>O nome é obrigatório</small>
                </div>

                <div id={styles.nacionality} className={styles.inputGroup}>
                  <label htmlFor="nacionality">Nacionalidade</label>
                  <input
                    type="text"
                    name="nacionality"
                    id="nacionality"
                    value={nacionality}
                    onChange={(evt) => setNacionality(evt.target.value)}
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.profession} className={styles.inputGroup}>
                  <label htmlFor="profession">Profissão</label>
                  <input
                    type="text"
                    name="profession"
                    id="profession"
                    value={profession}
                    onChange={(evt) => setProfession(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite a profissão"
                    required
                  />
                </div>

                <div id={styles.rg} className={styles.inputGroup}>
                  <label htmlFor="rg">RG</label>
                  <input
                    type="text"
                    name="rg"
                    id="rg"
                    value={rg}
                    onChange={(evt) => setRG(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o RG"
                    required
                  />
                </div>

                <div id={styles.cpf} className={styles.inputGroup}>
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    value={cpf}
                    onChange={(evt) => setCPF(evt.target.value)}
                    disabled={!isEditing}
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
                    id="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    placeholder="Digite o e-mail"
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div id={styles.tel} className={styles.inputGroup}>
                  <label htmlFor="tel">Telefone</label>
                  <input
                    type="text"
                    name="tel"
                    id="tel"
                    value={tel}
                    onChange={(evt) => setTel(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="(99) 99999-9999"
                    required
                  />
                </div>
              </div>

              <h3>Endereço</h3>

              <div className={isEditing ? styles.addressInputsEditing : styles.addressInputs}>
                <div className={`${styles.cepGroup} ${isEditing ? null : styles.hide}`}>
                  <div id={styles.cepSearch} className={styles.inputGroup}>
                    <label htmlFor="cep">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      id="cep"
                      value={cep}
                      onChange={(evt) => setCEP(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o CEP"
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.cepBtn}
                    onClick={() => handleSearchCEP()}
                  >
                    Buscar pelo CEP
                  </button>
                </div>

                <div className={styles.addressGroup}>
                  <div id={styles.cep} className={`${styles.inputGroup} ${isEditing ? styles.hide : null}`}>
                    <label htmlFor="cep">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      id="cep"
                      value={cep}
                      onChange={(evt) => setCEP(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o CEP"
                    />
                  </div>

                  <div id={styles.street} className={styles.inputGroup}>
                    <label htmlFor="street">Logradouro</label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      value={street}
                      onChange={(evt) => setStreet(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o Logradouro"
                    />
                  </div>

                  <div id={styles.city} className={styles.inputGroup}>
                    <label htmlFor="city">Cidade</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={(evt) => setCity(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite a cidade"
                    />
                  </div>

                  <div id={styles.uf} className={styles.inputGroup}>
                    <label htmlFor="uf">UF</label>
                    <Select
                      options={options}
                      id="uf"
                      name="uf"
                      disabled={!isEditing}
                      placeholder="--"
                      onChange={(evt) => setUF(evt.value)}
                    />
                  </div>

                  <div id={styles.district} className={styles.inputGroup}>
                    <label htmlFor="district">Bairro</label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      value={district}
                      onChange={(evt) => setDistrict(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o bairro"
                    />
                  </div>

                  <div id={styles.complement} className={styles.inputGroup}>
                    <label htmlFor="complement">Complemento</label>
                    <input
                      type="text"
                      name="complement"
                      id="complement"
                      value={complement}
                      onChange={(evt) => setComplement(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o complemento"
                    />
                  </div>
                </div>
              </div>

              <div className={`${styles.btnGroup} ${isEditing ? null : styles.hide}`}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowCancelEditModal(true)}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={() => validateFields()}
                >
                  Salvar alterações
                </button>

                <input type="submit" value="submit" id="submitBtn" className={styles.submitInput} />
              </div>
            </form>
          </div>
        </main>
      </Container>

      <div id="confirmDeletionModal" className={`${styles.modalContainer} ${showDeleteModal ? null : styles.hide}`}>
        <div className={styles.modal}>
          <h2>Confirmar exclusão</h2>

          <div className={styles.modalContent}>
            <span>Tem certeza que deseja excluir o registro?</span>
            <br />
            <span>Ao confirmar, todos os dados do cliente José Freitas serão removidos do sistema.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => handleConfirmDeletion()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <div id="confirmEditionModal" className={`${styles.modalContainer} ${showEditModal ? null : styles.hide}`}>
        <div className={styles.modal}>
          <h2>Deseja editar o registro?</h2>

          <div className={styles.modalContent}>
            <span>Prossiga para editar as informações do cliente José Freitas.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowEditModal(false)}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => handleConfirmEdition()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <div id="confirmCancelEditionModal" className={`${styles.modalContainer} ${showCancelEditModal ? null : styles.hide}`}>
        <div className={styles.modal}>
          <h2>Sair do modo de edição</h2>

          <div className={styles.modalContent}>
            <span>Ao confirmar, você sairá do modo de edição para dos dados do cliente José Freitas.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowCancelEditModal(false)}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => handleConfirmCancelEdition()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <div id="confirmSaveEditionModal" className={`${styles.modalContainer} ${showSaveEditModal ? null : styles.hide}`}>
        <div className={styles.modal}>
          <h2>Confirmar alteração</h2>

          <div className={styles.modalContent}>
            <span>Ao confirmar, os dados do cliente José Freitas serão atualizados no sistema.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowSaveEditModal(false)}
            >
              Cancelar
            </button>

            <label htmlFor="submitBtn" className={styles.submitLabel}>
              Confirmar
            </label>
          </div>
        </div>
      </div>

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