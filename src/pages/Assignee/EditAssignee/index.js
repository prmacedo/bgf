import React, { useState } from 'react';

import { FiEdit2, FiBriefcase, FiTrash2 } from 'react-icons/fi';

import Container from '../../../components/Container';
import AddressForm from '../../../components/AddressForm';
import Alert from '../../../components/CustomAlert';

import API_URL from '../../../config/api';

import styles from './styles.module.css';

import cancelEdit from '../../../assets/icons/cancel-edit.svg';
import { useParams } from 'react-router-dom';
import { useUserData } from '../../../context/UserData';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { cnpjMask, telephoneMask, cpfMask } from '../../../utils/masks';

export default function EditAssignee() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelEditModal, setShowCancelEditModal] = useState(false);
  const [showSaveEditModal, setShowSaveEditModal] = useState(false);

  const [name, setName] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  const [cep, setCEP] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');

  const [adminId, setAdminId] = useState(0);
  const [adminName, setAdminName] = useState('');
  const [adminCNPJ, setAdminCNPJ] = useState('');

  const [adminCEP, setAdminCEP] = useState('');
  const [adminStreet, setAdminStreet] = useState('');
  const [adminCity, setAdminCity] = useState('');
  const [adminUF, setAdminUF] = useState('');
  const [adminDistrict, setAdminDistrict] = useState('');
  const [adminComplement, setAdminComplement] = useState('');

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [assigneeType, setAssigneeType] = useState(1);

  const { id } = useParams();
  
  const { headers } = useUserData();

  const history = useHistory();

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

  async function getAssignee() {
    try {
      const response = await API_URL.get(`/assignee/${id}`, { headers });

      const { data } = response;
      setName(data.name);
      setCNPJ(data.cnpj);
      setCPF(data.cpf);
      setAssigneeType(data.type)
      setEmail(data.email);
      setTel(data.telephone);

      setCEP(data.cep);
      setStreet(data.street);
      setCity(data.city);
      setUF(options.find(option => option.value === data.uf));
      setDistrict(data.district);
      setComplement(data.complement);

      if(data.type === 1) {
        setAdminId(data.admin.id);
        setAdminName(data.admin.name);
        setAdminCNPJ(data.admin.cnpj);
        
        setAdminCEP(data.admin.cep);
        setAdminStreet(data.admin.street);
        setAdminCity(data.admin.city);
        setAdminUF(options.find(option => option.value === data.admin.uf));
        setAdminDistrict(data.admin.district);
        setAdminComplement(data.admin.complement);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditAssignee() {
    const data = {
      name,
      cnpj,
      type: assigneeType,
      cpf,
      email,
      tel,
      cep,
      street,
      city,
      uf: uf.value,
      district,
      complement
    }

    const adminData = {
     name: adminName,
     cnpj: adminCNPJ,
     cep: adminCEP,
     street: adminStreet,
     admin: adminCity,
     uf: adminUF.value,
     district: adminDistrict,
     complement: adminComplement
    }

    try {
      const response = await API_URL.patch(`/assignee/${id}`, data, { headers });
      if (assigneeType === 1) {
        const responseAdmin = await API_URL.patch(`/admin/${adminId}`, adminData, { headers });
      }

      setShowSaveEditModal(false);
      setIsEditing(false);

      setMessage("Atualizado com sucesso!")
      setSeverity("success")
      setOpen(true)
    } catch (error) {
      console.log(error);

      if (error.response.status === 422) {
        setMessage("CNPJ inv??lido!")
        setSeverity("error")
        setOpen(true)
      } else {
        setMessage("Erro ao atualizar!")
        setSeverity("error")
        setOpen(true)
      }
    }    
  }

  async function handleConfirmDeletion() {    
    try {
      const response = await API_URL.delete(`/assignee/${id}`, { headers });
      const responseAdmin = await API_URL.delete(`/admin/${adminId}`, { headers });

      console.log(response);
      console.log(responseAdmin);

      setShowDeleteModal(false);
      history.goBack();
    } catch(error) {
      console.log(error);

      setMessage("Erro ao excluir!")
      setSeverity("error")
      setOpen(true)
    }
  }
  
  function handleConfirmEdition() {
    setShowEditModal(false);
    setIsEditing(true);
  }
  
  function handleConfirmCancelEdition() {
    setShowCancelEditModal(false);
    setIsEditing(false);

    toggleFieldError(true, 'name');
    toggleFieldError(true, 'email');
    // Reset inputs
  }

  function validateFields() {
    if (name && email) {
      setShowSaveEditModal(true);
    }

    toggleFieldError(name, 'name');
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

  useEffect(() => {
    getAssignee();
  }, []);

  return (
    <>
      <Container>
        <header className={styles.header}>
          <h1>
            <FiBriefcase />
            Cession??rio
          </h1>
        </header>

        <main className={styles.main}>
          <div className={styles.toolsRow}>
            <h2>Dados do Cession??rio</h2>
            
            <div className={styles.btnGroup}>
              {isEditing 
              ?
                <>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.redBtn}`}
                    onClick={() => setShowCancelEditModal(true)}
                  >
                    <img src={cancelEdit} alt="Cancelar edi????o" />
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
            <div className={styles.radios}>              
              <label className={styles.radio}>
                <input
                  type='radio'
                  name='assigneeType'
                  value={1}
                  checked={assigneeType == 1}
                  disabled={!isEditing}
                  onChange={(evt) => setAssigneeType(evt.target.value)}
                  />
                Pessoa Jur??dica
              </label>

              <label className={styles.radio}>
                <input
                  type='radio'
                  name='assigneeType'
                  value={2}
                  checked={assigneeType == 2}
                  disabled={!isEditing}
                  onChange={(evt) => setAssigneeType(evt.target.value)}
                />
                Pessoa F??sica
              </label>
            </div>

            <form id="editForm">
              <div className={styles.assigneeInputs}>
                <div id={styles.name} className={styles.inputGroup}>
                  <label htmlFor="name">Nome completo</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o nome do Cession??rio"
                    required
                  />
                  <small className={styles.hide}>O nome ?? obrigat??rio</small>
                </div>

                { assigneeType == 1 ?
                <div id={styles.cnpj} className={styles.inputGroup}>
                  <label htmlFor="cnpj">CNPJ</label>
                  <input
                    type="cnpj"
                    name="cnpj"
                    id="cnpj"
                    value={cnpj}
                    onChange={(evt) => setCNPJ(cnpjMask(evt.target.value))}
                    disabled={!isEditing}
                    placeholder="00.000.000/0001-00"
                    required
                  />
                  <small className={styles.hide}>O CNPJ ?? obrigat??rio</small>
                </div>
                :
                <div id={styles.cpf} className={styles.inputGroup}>
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={cpf}
                    disabled={!isEditing}
                    onChange={(evt) => setCPF(cpfMask(evt.target.value))}
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                }

                <div id={styles.email} className={styles.inputGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o e-mail"
                    required
                    />
                  <small className={styles.hide}>O e-mail ?? obrigat??rio</small>
                </div>

                <div id={styles.tel} className={styles.inputGroup}>
                  <label htmlFor="tel">Telefone</label>
                  <input
                    type="text"
                    name="tel"
                    id="tel"
                    value={tel}
                    onChange={(evt) => setTel(telephoneMask(evt.target.value))}
                    disabled={!isEditing}
                    placeholder="(99) 99999-9999"
                  />
                </div>
              </div>

              <AddressForm
                title={'Endere??o do Cession??rio'}
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
                disabled={!isEditing}
              />       

              { assigneeType == 1 &&        
              <>
              <h2>Dados da Institui????o Administradora do Cession??rio</h2>

              <div className={styles.assigneeAdminInputs}>
                <div id={styles.adminName} className={styles.inputGroup}>
                  <label htmlFor="adminName">Nome completo</label>
                  <input
                    type="text"
                    name="adminName"
                    id="adminName"
                    value={adminName}
                    onChange={(evt) => setAdminName(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o nome da Institui????o"
                    required
                  />
                  <small className={styles.hide}>O nome ?? obrigat??rio</small>
                </div>

                <div id={styles.adminCNPJ} className={styles.inputGroup}>
                  <label htmlFor="adminCNPJ">CNPJ</label>
                  <input
                    type="text"
                    name="adminCNPJ"
                    id="adminCNPJ"
                    value={adminCNPJ}
                    onChange={(evt) => setAdminCNPJ(cnpjMask(evt.target.value))}
                    disabled={!isEditing}
                    placeholder="00.000.000/0001-00"
                    required
                  />
                  <small className={styles.hide}>O CNPJ ?? obrigat??rio</small>
                </div>
              </div>

              <AddressForm
                title={'Endere??o da Institui????o Administradora'}
                cep={adminCEP}
                setCEP={setAdminCEP}
                street={adminStreet}
                setStreet={setAdminStreet}
                city={adminCity}
                setCity={setAdminCity}
                uf={adminUF}
                setUF={setAdminUF}
                district={adminDistrict}
                setDistrict={setAdminDistrict}
                complement={adminComplement}
                setComplement={setAdminComplement}
                disabled={!isEditing}
              />      
              </>
              }
              
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
                  Salvar altera????es
                </button>
              </div>
            </form>
          </div>
        </main>
      </Container>

      <div id="confirmDeletionModal" className={`${styles.modalContainer} ${showDeleteModal ? null : styles.hide}`}>
        <div className={styles.modal}>
          <h2>Confirmar exclus??o</h2>
          
          <div className={styles.modalContent}>
            <span>Tem certeza que deseja excluir o registro?</span>
            <br />
            <span>Ao confirmar, todos os dados do cession??rio { name } ser??o removidos do sistema.</span>
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
            <span>Prossiga para editar as informa????es do cession??rio { name }.</span>
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
          <h2>Sair do modo de edi????o</h2>

          <div className={styles.modalContent}>
            <span>Ao confirmar, voc?? sair?? do modo de edi????o para dos dados do cession??rio { name }.</span>
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
          <h2>Confirmar altera????o</h2>

          <div className={styles.modalContent}>
            <span>Ao confirmar, os dados do cession??rio { name } ser??o atualizados no sistema.</span>
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
              type="button"
              className={styles.submitBtn}
              onClick={() => handleEditAssignee()}
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
      />
    </>
  );
}