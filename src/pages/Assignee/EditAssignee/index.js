import React, { useState } from 'react';

import { FiEdit2, FiBriefcase, FiTrash2 } from 'react-icons/fi';

import Container from '../../../components/Container';
import AddressForm from '../../../components/AddressForm';

import styles from './styles.module.css';

import cancelEdit from '../../../assets/icons/cancel-edit.svg';

export default function EditAssignee() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelEditModal, setShowCancelEditModal] = useState(false);
  const [showSaveEditModal, setShowSaveEditModal] = useState(false);

  const [name, setName] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  const [cep, setCEP] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');

  const [adminName, setAdminName] = useState('');
  const [adminCNPJ, setAdminCNPJ] = useState('');

  const [adminCEP, setAdminCEP] = useState('');
  const [adminStreet, setAdminStreet] = useState('');
  const [adminCity, setAdminCity] = useState('');
  const [adminUF, setAdminUF] = useState('');
  const [adminDistrict, setAdminDistrict] = useState('');
  const [adminComplement, setAdminComplement] = useState('');

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

  function handleEditSettings(evt) {
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

    toggleFieldError(true, 'name');
    toggleFieldError(true, 'cnpj');
    toggleFieldError(true, 'email');

    // Reset inputs
  }

  function validateFields() {
    if (name && cnpj && email) {
      setShowSaveEditModal(true);
    }

    toggleFieldError(name, 'name');
    toggleFieldError(cnpj, 'cnpj');
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

  function handleSearchCEP() {
    // Chamar API de CEP
  }

  return (
    <>
      <Container>
        <header className={styles.header}>
          <h1>
            <FiBriefcase />
            Cessionário
          </h1>
        </header>

        <main className={styles.main}>
          <div className={styles.toolsRow}>
            <h2>Dados do Cessionário</h2>

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
                    placeholder="Digite o nome do Cessionário"
                    required
                  />
                  <small className={styles.hide}>O nome é obrigatório</small>
                </div>

                <div id={styles.cnpj} className={styles.inputGroup}>
                  <label htmlFor="cnpj">CNPJ</label>
                  <input
                    type="cnpj"
                    name="cnpj"
                    id="cnpj"
                    value={cnpj}
                    onChange={(evt) => setCNPJ(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="00.000.000/0001-00"
                    required
                  />
                  <small className={styles.hide}>O CNPJ é obrigatório</small>
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
                    placeholder="Digite o e-mail"
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
              </div>

              <AddressForm
                title={'Endereço do Cessionário'}
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

              {/* <h3>Endereço do Cessionário</h3>
              
              <div className={isEditing ? styles.addressInputsEditing : styles.addressInputs}>
                <div className={`${styles.cepGroup} ${isEditing ? null : styles.hide}`}>
                  <div id={styles.cepSearch} className={styles.inputGroup}>
                    <label htmlFor="cep">CEP</label>
                    <input
                      type="text"
                      name="cep"
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
                      value={complement}
                      onChange={(evt) => setComplement(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o complemento"
                    />
                  </div>
                </div>
              </div> */}

              <h2>Dados da Instituição Administradora do Cessionário</h2>

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
                    placeholder="Digite o nome da Instituição"
                    required
                  />
                  <small className={styles.hide}>O nome é obrigatório</small>
                </div>

                <div id={styles.adminCNPJ} className={styles.inputGroup}>
                  <label htmlFor="adminCNPJ">CNPJ</label>
                  <input
                    type="text"
                    name="adminCNPJ"
                    id="adminCNPJ"
                    value={adminCNPJ}
                    onChange={(evt) => setAdminCNPJ(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="00.000.000/0001-00"
                    required
                  />
                  <small className={styles.hide}>O CNPJ é obrigatório</small>
                </div>
              </div>

              <AddressForm
                title={'Endereço da Instituição Administradora'}
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

              {/* <h3>Endereço da Instituição Administradora</h3>

              <div className={isEditing ? styles.addressInputsEditing : styles.addressInputs}>
                <div className={`${styles.cepGroup} ${isEditing ? null : styles.hide}`}>
                  <div id={styles.cepAdminSearch} className={styles.inputGroup}>
                    <label htmlFor="adminCEP">CEP</label>
                    <input
                      type="text"
                      name="adminCEP"
                      value={adminCEP}
                      onChange={(evt) => setAdminCEP(evt.target.value)}
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
                  <div id={styles.adminCEP} className={`${styles.inputGroup} ${isEditing ? styles.hide : null}`}>
                    <label htmlFor="adminCEP">CEP</label>
                    <input
                      type="text"
                      name="adminCEP"
                      value={adminCEP}
                      onChange={(evt) => setAdminCEP(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o CEP"
                    />
                  </div>

                  <div id={styles.adminStreet} className={styles.inputGroup}>
                    <label htmlFor="adminStreet">Logradouro</label>
                    <input
                      type="text"
                      name="adminStreet"
                      value={adminStreet}
                      onChange={(evt) => setAdminStreet(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o Logradouro"
                    />
                  </div>

                  <div id={styles.adminCity} className={styles.inputGroup}>
                    <label htmlFor="adminCity">Cidade</label>
                    <input
                      type="text"
                      name="adminCity"
                      value={adminCity}
                      onChange={(evt) => setAdminCity(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite a cidade"
                    />
                  </div>

                  <div id={styles.adminUF} className={styles.inputGroup}>
                    <label htmlFor="adminUF">UF</label>
                    <Select
                      options={options}
                      id="adminUF"
                      name="adminUF"
                      disabled={!isEditing}
                      placeholder="--"
                      onChange={(evt) => setAdminUF(evt.value)}
                    />
                  </div>

                  <div id={styles.adminDistrict} className={styles.inputGroup}>
                    <label htmlFor="adminDistrict">Bairro</label>
                    <input
                      type="text"
                      name="adminDistrict"
                      value={adminDistrict}
                      onChange={(evt) => setAdminDistrict(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o bairro"
                    />
                  </div>

                  <div id={styles.adminComplement} className={styles.inputGroup}>
                    <label htmlFor="adminComplement">Complemento</label>
                    <input
                      type="text"
                      name="adminComplement"
                      value={adminComplement}
                      onChange={(evt) => setAdminComplement(evt.target.value)}
                      disabled={!isEditing}
                      placeholder="Digite o complemento"
                    />
                  </div>
                </div>
              </div> */}
              
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
            <span>Ao confirmar, todos os dados do cessionário Cessionário 01 serão removidos do sistema.</span>
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
            <span>Prossiga para editar as informações do cessionário Cessionário 01.</span>
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
            <span>Ao confirmar, você sairá do modo de edição para dos dados do cessionário Cessionário 01.</span>
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
            <span>Ao confirmar, os dados do cessionário Cessionário 01 serão atualizados no sistema.</span>
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
    </>
  );
}