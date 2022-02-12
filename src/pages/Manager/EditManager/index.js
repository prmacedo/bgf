import React, { useState } from 'react';

import { FiEdit2, FiClipboard, FiTrash2 } from 'react-icons/fi';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import styles from './styles.module.css';

import cancelEdit from '../../../assets/icons/cancel-edit.svg';
import { useEffect } from 'react';
import API_URL from '../../../config/api';
import { useHistory, useParams } from 'react-router-dom';
import { useUserData } from '../../../context/UserData';

export default function EditManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelEditModal, setShowCancelEditModal] = useState(false);
  const [showSaveEditModal, setShowSaveEditModal] = useState(false);
  const [showToggleActiveModal, setShowToggleActiveModal] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [active, setActive] = useState('');

  const { id } = useParams();
  const { headers } = useUserData();

  const history = useHistory();

  const options = [
    { value: "admin", label: "Administrador" },
    { value: "manager", label: "Gerente" }
  ];

  function handleEditSettings(evt) {
    evt.preventDefault();
    
    // Fecha modal e desabilita edição
    setShowSaveEditModal(false);
    setIsEditing(false);

    console.log(evt.target);
  }

  function handleToggleActive(evt) {
    evt.preventDefault();

    setActive(!active);
    setShowToggleActiveModal(false)
  }  
  
  function handleConfirmEdition() {
    setShowEditModal(false);
    setIsEditing(true);
  }
  
  function handleConfirmCancelEdition() {
    setShowCancelEditModal(false);
    setIsEditing(false);

    toggleFieldError(true, 'name');
    toggleFieldError(true, 'type');
    toggleFieldError(true, 'email');

    // Reset inputs
  }

  function validateFields() {
    if (name && type && email) {
      setShowSaveEditModal(true);
    }

    toggleFieldError(name, 'name');
    toggleFieldError(type, 'type');
    toggleFieldError(email, 'email');
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

  async function handleSubmit() {
    const data = {
      name,
      type: type.value,
      email,
      telephone: tel
    };

    try {
      const response = await API_URL.patch(`/user/${id}`, data , { headers });    

      setShowSaveEditModal(false);
      setIsEditing(false);      
    } catch (error) {
      console.log(error);
    }
  }

  async function handleActiveSubmit() {
    const data = {
      active: !active
    };

    try {
      const response = await API_URL.patch(`/user/${id}`, data, { headers });

      setShowToggleActiveModal(false);
      setActive(!active);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleConfirmDeletion() {
    try {
      const response = await API_URL.delete(`/user/${id}`, { headers });

      setShowDeleteModal(false);

      history.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  async function getManager() {
    try {
      const response = await API_URL.get(`/user/${id}`, { headers });
      const { data } = response;

      const typeObj = options.find(option => option.value === data.type);
      
      setName(data.name);
      setType(typeObj);
      setEmail(data.email);
      setTel(data.telephone);
      setActive(data.active);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getManager()
  }, []);

  return (
    <>
      <Container>
        <header className={styles.header}>
          <h1>
            <FiClipboard />
            Gerente
          </h1>
        </header>

        <main className={styles.main}>
          <div className={styles.toolsRow}>
            <form id="toggleActiveForm" onSubmit={handleToggleActive}>
              <input type="hidden" name="active" value={active} />
              <button
                type="button"
                className={styles.passwordBtn}
                disabled={isEditing}
                onClick={() => setShowToggleActiveModal(true)}              
              >
                {active ? 'Inativar' : 'Ativar'} usuário
              </button>
              {/* <input type="submit" value="submit" id="toggleActiveBtn" className={styles.submitInput} /> */}
            </form>

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
            <form id="editForm" onSubmit={handleEditSettings}>
              <div id={styles.name} className={styles.inputGroup}>
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                  disabled={!isEditing}
                  placeholder="Seu nome"
                  required
                />
                <small className={styles.hide}>O nome é obrigatório</small>
              </div>

              <div id={styles.type} className={styles.inputGroup}>
                <label htmlFor="type">Cargo</label>
                <Select 
                  options={options}
                  name="type"
                  id="type"
                  onChange={(evt) => setType(options.find(option => option.value === evt.value))}
                  placeholder="Escolha o cargo"
                  disabled={!isEditing}
                  value={type}
                />
                <small className={styles.hide}>Selecione umas das opções</small>
              </div>

              <div id={styles.email} className={styles.inputGroup}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  disabled={!isEditing}
                  placeholder="seu-email@dominio.com"
                  required
                  />
                <small className={styles.hide}>O e-mail é obrigatório</small>
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
                />
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
            <span>Ao confirmar, todos os dados do usuário { name } serão removidos do sistema.</span>
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
            <span>Prossiga para editar as informações do usuário { name }.</span>
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
            <span>Ao confirmar, você sairá do modo de edição dos dados de { name }.</span>
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
            <span>Ao confirmar, os dados de { name } serão atualizados no sistema.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowSaveEditModal(false)}
            >
              Cancelar
            </button>

            <button 
              type='button'
              className={styles.submitBtn}
              onClick={() => handleSubmit()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <div id="toggleActiveModal" className={`${styles.modalContainer} ${showToggleActiveModal ? null : styles.hide}`}>
        <div className={styles.modal}>
          <h2>{active ? 'Inativar' : 'Ativar'} usuário</h2>

          <div className={styles.modalContent}>
            <span>Ao confirmar, o usuário { name } será {active ? 'inativado' : 'ativado'}.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowToggleActiveModal(false)}
            >
              Cancelar
            </button>

            <button
              type='button'
              className={styles.submitBtn}
              onClick={() => handleActiveSubmit()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}