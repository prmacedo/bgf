import React, { useState } from 'react';

import { FiEdit2, FiSettings } from 'react-icons/fi';
import cancelEdit from '../../assets/icons/cancel-edit.svg';

import Alert from '../../components/CustomAlert';
import Container from '../../components/Container';
import Select from '../../components/Select';
import API_URL from '../../config/api';
import { useUserData } from '../../context/UserData';

import { telephoneMask } from '../../utils/masks';

import styles from './styles.module.css';

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const { user, headers } = useUserData();

  const { id } = user.user;
  
  const options = [
    { value: "admin", label: "Administrador" },
    { value: "manager", label: "Gerente" }
  ];

  const [name, setName] = useState(user.user.name);
  const [type, setType] = useState(options.find(option => option.value === user.user.type));
  const [email, setEmail] = useState(user.user.email);
  const [tel, setTel] = useState(user.user.telephone);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  function toggleEditionModal() {
    const settingsModal = document.querySelector('#settingsModal');

    settingsModal.classList.toggle(`${styles.hide}`);
  }

  function toggleCancelModal() {
    const cancelSettingsModal = document.querySelector('#cancelSettingsModal');

    cancelSettingsModal.classList.toggle(`${styles.hide}`);
  }

  function togglePasswordModal() {
    const passModal = document.querySelector('#changePasswordModal');

    passModal.classList.toggle(`${styles.hide}`);

    setPassword('');
    setNewPassword('');
  }

  function handleConfirmEdition() {
    setIsEditing(true);
    toggleEditionModal();
  }

  function handleCancelEdition() {
    setIsEditing(false);
    toggleCancelModal();
  }

  function isPasswordValid() {
    if (password.length === 0 || newPassword.length === 0) {
      setMessage('Os campos devem ser preenchidos!')
      setSeverity('error')
      setOpen(true)

      return false;
    }
    else if (password.length < 8 || newPassword.length < 8) {
      setMessage('A nova senha deve possuir ao menos 8 caracteres!')
      setSeverity('error')
      setOpen(true)

      return false;
    }      
    else if (password !== newPassword) {
      setMessage('Preencha os campos com o mesmo valor!')
      setSeverity('error')
      setOpen(true)

      return false;
    }

    return true;
  }

  async function handleChangePassword() {
    if(!isPasswordValid()) return;

    const data = {
      password
    }

    try {
      const response = await API_URL.patch(`/user/password/${id}`, data, { headers });
      togglePasswordModal();
      console.log(response);
      setMessage('Senha alterada com sucesso!')
      setSeverity('success')
      setOpen(true)
    } catch (error) {
      console.log(error);
      setMessage('Erro ao alterar a senha!')
      setSeverity('error')
      setOpen(true)
    }
  }

  async function handleEditSettings() {    
    const data = {
      name,
      type: type.value,
      email,
      telephone: tel
    }

    try {
      const response = await API_URL.patch(`/user/${id}`, data, { headers });
      
      const localUser = JSON.parse(localStorage.getItem("user"));
      
      localUser.user.name = data.name;
      localUser.user.type = data.type;
      localUser.user.email = data.email;
      localUser.user.telephone = data.telephone;
      
      localStorage.setItem("user", JSON.stringify(localUser));
      
      setIsEditing(false);

      setMessage('Altera????es salvas com sucesso.')
      setSeverity('success')
      setOpen(true)
      
      console.log(response);
    } catch (error) {
      console.log(error);
      setMessage('Erro ao salvar altera????es.')
      setSeverity('error')
      setOpen(true)
    }

    // console.log(data)
  }

  return (
    <>
      <Container>
        <header className={styles.header}>
          <h1>
            <FiSettings />
            Configura????es
          </h1>
        </header>

        <main className={styles.main}>
          <div className={styles.toolsRow}>
            <button 
              type="button" 
              className={styles.passwordBtn}
              onClick={() => togglePasswordModal()}
            >
              Alterar senha
            </button>
            {isEditing 
              ?
                <button
                  type="button"
                  className={`${styles.btn} ${styles.redBtn}`}
                  onClick={() => toggleCancelModal()}
                >
                  <img src={cancelEdit} alt="Cancelar edi????o" />
                </button>
              :
                <button 
                  type="button" 
                  className={styles.btn}
                  onClick={() => toggleEditionModal()}
                >
                  <FiEdit2 />
                </button>
              }
          </div>

          <div className={styles.formContainer}>
            <form>
              <div id={styles.name} className={styles.inputGroup}>
                <label htmlFor="name">Nome completo</label>
                <input 
                  type="text"
                  name="name"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                  disabled={!isEditing}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div id={styles.type} className={styles.inputGroup}>
                <label htmlFor="type">Cargo</label>
                <Select
                  options={options}
                  name="type"
                  id="type"
                  onChange={(evt) => setType(options.find(option => option.value === evt.value))}
                  placeholder="Escolha o cargo"
                  disabled={!isEditing || user.user.type === 'manager'}
                  value={type}
                />
              </div>

              <div id={styles.email} className={styles.inputGroup}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  disabled={!isEditing}
                  placeholder="seu-email@dominio.com"
                  required
                />
              </div>

              <div id={styles.tel} className={styles.inputGroup}>
                <label htmlFor="tel">Telefone</label>
                <input
                  type="text"
                  name="tel"
                  value={tel}
                  onChange={(evt) => setTel(telephoneMask(evt.target.value))}
                  disabled={!isEditing}
                  placeholder="(99) 99999-9999"
                />
              </div>     

              <div className={`${styles.btnGroup} ${isEditing ? null : styles.hide}`}>
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className={styles.submitBtn}
                  onClick={() => handleEditSettings()}
                >
                  Salvar altera????es
                </button>
              </div>
            </form>
          </div>
        </main>
      </Container>

      <div id="changePasswordModal" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Alterar a senha</h2>

          <div className={styles.modalContent}>
            <form>
              <div id={styles.password} className={styles.inputGroup}>
                <label htmlFor="password">Nova senha</label>
                <input 
                  type="password" 
                  name="password" 
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  placeholder='Informe a nova senha'
                />
              </div>

              <div id={styles.password} className={styles.inputGroup}>
                <label htmlFor="newPassword">Confirmar nova senha</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(evt) => setNewPassword(evt.target.value)}
                  placeholder='Confirmar a nova senha'
                />
              </div>
            </form>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => togglePasswordModal()}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => handleChangePassword()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <div id="settingsModal" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Deseja editar o registro?</h2>

          <div className={styles.modalContent}>
            <span>Prossiga para editar as informa????es.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => toggleEditionModal()}
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

      <div id="cancelSettingsModal" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Sair do modo de edi????o</h2>

          <div className={styles.modalContent}>
            <span>Ao confirmar, voc?? sair?? do modo de edi????o.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => toggleCancelModal()}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => handleCancelEdition()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <Alert
        severity={severity}
        message={message}
        variant="filled"
        open={open}
        setOpen={setOpen}
        vertical={"bottom"}
      />
    </>
  );
}