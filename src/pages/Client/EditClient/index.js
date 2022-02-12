import React, { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { FiEdit2, FiUser, FiPlus, FiTrash2, FiDownload, FiXCircle, FiEye, FiEyeOff } from 'react-icons/fi';

import Container from '../../../components/Container';
import Select from '../../../components/Select';
import AddressForm from '../../../components/AddressForm';

import styles from './styles.module.css';

import cancelEdit from '../../../assets/icons/cancel-edit.svg';
import { useEffect } from 'react';
import API_URL from '../../../config/api';
import { useUserData } from '../../../context/UserData';

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
  const [projects, setProjects] = useState([]);

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

  const [partnerId, setPartnerId] = useState(0);
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

  const [proposalList, setProposalList] = useState([]);
  const [proposal, setProposal] = useState(0);
  const [contractList, setContractList] = useState([]);
  const [contract, setContract] = useState(0);

  const { id } = useParams();

  const { headers } = useUserData();

  const history = useHistory();

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
  ];

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

  function toggleHiddenModal(id) {
    document.querySelector(`#${id}`).classList.toggle(styles.hide);
  }

  async function handleEditClient() {
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
        city: partnerCity,
        uf: partnerUF.value,
        district: partnerDistrict,
        complement: partnerComplement
      }

      try {
        const response = await API_URL.patch(`/partner/${partnerId}`, partnerData, { headers });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    const data = {
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
      uf: uf.value,
      city,
      district,
      complement,
      projectId: project.value
    }

    try {
      const response = await API_URL.patch(`/client/${id}`, data, { headers });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // Fecha modal e desabilita edição
    setShowSaveEditModal(false);
    setIsEditing(false);
  }

  async function handleConfirmDeletion() {
    try {
      const response = await API_URL.delete(`/client/${id}`, { headers });
      const responsePartner = await API_URL.delete(`/partner/${partnerId}`, { headers });
      
      console.log(response);
      console.log(responsePartner);
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
    
    history.push('/clients');
  }

  function handleConfirmEdition() {
    setShowEditModal(false);
    setIsEditing(true);
  }

  function handleConfirmCancelEdition() {
    setShowCancelEditModal(false);
    setIsEditing(false);

    // Reset inputs
    getClient();
  }

  function validateFields() {
    // if (name  && email) {
      setShowSaveEditModal(true);
    // }
  }

  function handleHideData(id) {
    document.querySelector(`#${id} > div`).classList.toggle(`${styles.hide}`);
    const svgs = document.querySelectorAll(`#${id} > h3 > svg`);

    svgs[0].classList.toggle(styles.hide);
    svgs[1].classList.toggle(styles.hide);
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

  function downloadAttachment(attachment) {
    // Implementar lógica
  }

  function deleteAttachment(attachment) {
    // Implementar lógica
  }

  async function getClient() {
    try {
      const response = await API_URL.get(`/client/${id}`, { headers });
      const { data } = response;

      localStorage.setItem("client", JSON.stringify(data));
      
      const projectObj = { value: data.project.id, label: data.project.name };
      
      setProject(projectObj);
      setName(data.name);
      setNacionality(data.nationality);
      setGender(genders.find(gender => gender.value === data.gender));
      setMaritalState(maritalStates.find(maritalState => maritalState.value === data.maritalStatus));
      setProfession(data.profession);
      setCPF(data.cpf);
      setRG(data.rg);
      setEmail(data.email);
      setTel(data.telephone);
      setCEP(data.cep);
      setStreet(data.street);
      setCity(data.city);
      setUF(ufs.find(uf => uf.value === data.uf));
      setDistrict(data.district);
      setComplement(data.complement);

      const { partner } = data;

      if (partner) {
        setPartnerId(partner.id);
        setPartnerName(partner.name);
        setPartnerNacionality(partner.nationality);
        setPartnerGender(genders.find(gender => gender.value === partner.gender));
        setMarriageRegime(marriageRegimes.find(marriageRegime => marriageRegime.value === partner.marriageRegime));
        setPartnerProfession(partner.profession);
        setPartnerCPF(partner.cpf);
        setPartnerRG(partner.uf);
        setPartnerEmail(partner.email);
        setPartnerTel(partner.telephone);

        setPartnerCEP(partner.cep);
        setPartnerStreet(partner.street);
        setPartnerCity(partner.city);
        setPartnerUF(ufs.find(uf => uf.value === partner.uf));
        setPartnerDistrict(partner.district);
        setPartnerComplement(partner.complement);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getClientsDocuments() {
    try {
      const response = await API_URL.get(`/proposal/byUser/${id}`, { headers });
      const responseContract = await API_URL.get(`/contract/byUser/${id}`, { headers });
      
      const proposalFormattedList = response.data.map(proposal => ({
        value: proposal.id,
        label: proposal.precatory
      }));

      const contractFormattedList = responseContract.data.map(contract => ({
        value: contract.id,
        label: contract.precatory
      }));

      console.log(response);
      console.log(responseContract);

      console.log(contractFormattedList);

      setProposalList(proposalFormattedList);
      setContractList(contractFormattedList);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProjects() {
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

  function toggleProposalModal() {
    const modal = document.querySelector('#editOrNewProposalModal');
    modal.classList.toggle(styles.hide);
  }

  function toggleContractModal() {
    const modal = document.querySelector('#editOrNewContractModal');
    modal.classList.toggle(styles.hide);
  }

  function toggleSelectEditProposal() {
    const modal = document.querySelector('#selectProposalModal');
    modal.classList.toggle(styles.hide);
  }

  function toggleSelectNewContract() {
    const modal = document.querySelector('#selectNewContractModal');
    modal.classList.toggle(styles.hide);
  }

  function toggleSelectContract() {
    const modal = document.querySelector('#selectContractModal');
    modal.classList.toggle(styles.hide);
  }

  function toggleProposalModals() {
    toggleSelectEditProposal();
    toggleProposalModal();
    setProposal('');
  }

  function toggleNewContractModals() {
    toggleSelectNewContract();
    toggleContractModal();
    setContract('');
  }

  function toggleContractModals() {
    toggleSelectContract();
    toggleContractModal();
    setContract('');
  }

  function redirectToEditProposal() {
    history.push(`/client/${id}/edit/proposal/${proposal.value}`);
  }

  function redirectToCreateProposal() {
    history.push(`/client/${id}/new/proposal`);
  }

  function redirectToEditContract() {
    history.push(`/client/${id}/edit/contract/${contract.value}`);
  }

  function redirectToCreateContract() {
    history.push(`/client/${id}/new/contract/${contract.value}`);
  }

  useEffect(() => {
    getProjects();
    getClientsDocuments();
    getClient();
  }, []);

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
                className={`${styles.outlineBtn} ${isEditing ? styles.disabled : null}`}
                onClick={() => toggleProposalModal()}
              >
                Gerar Proposta
              </button>

              <button
                type="button"
                className={`${styles.outlineBtn} ${isEditing ? styles.disabled : null}`}
                onClick={() => toggleContractModal()}
              >
                Gerar Contrato
              </button>

              <div className={styles.attachmentContainer}>
                <button
                  type="button"
                  className={styles.outlineBtn}
                  disabled={isEditing}
                  onClick={() => toggleHiddenModal('attachmentModal')}
                >
                  Anexos
                </button>

                <div id="attachmentModal" className={`${styles.attachmentContent} ${styles.hide}`}>
                  <div className={styles.attachmentHeader}>
                    <h3>Anexos</h3>
                    <span
                      className={styles.closeBtn}
                      onClick={() => toggleHiddenModal('attachmentModal')}
                    >
                      <FiXCircle />
                    </span>
                  </div>

                  <div className={styles.attachmentList}>
                    <div className={styles.attachmentItem}>
                      <span>Nome do anexo</span>

                      <div className={styles.attachmentBtns}>
                        <button
                          type="button"
                          className={styles.btn}
                          onClick={() => downloadAttachment('id')}
                        >
                          <FiDownload/>
                        </button>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.redBtn}`}
                          onClick={() => deleteAttachment('id')}
                        >
                          <FiTrash2/>
                        </button>
                      </div>
                    </div>
                  </div>  

                  <div className={styles.newAttachmentBtn}>
                    <form action="">
                      <input type="file" name="file" id="file" className={styles.hide} />
                      <label htmlFor="file" className={styles.outlineLabel}>
                        Anexar novo arquivo
                      </label>

                    </form>
                  </div>                
                </div>
              </div>

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
            <form id="editForm">
              <h3>Detalhes do cliente</h3>

              <div className={styles.detailsInputs}>
                <div id={styles.project} className={styles.inputGroup}>
                  <label htmlFor="project">Projeto</label>
                  <Select
                    options={projects}
                    value={project}
                    id="project"
                    name="project"
                    placeholder="Selecione o projeto"
                    onChange={(evt) => setProject(projects.find(project => project.value === evt.value))}
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
                    value={gender}
                    placeholder="Selecione o sexo"
                    onChange={(evt) => setGender(evt.value)}
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

                <div id={styles.maritalState} className={styles.inputGroup}>
                  <label htmlFor="maritalState">Estado Civil</label>
                  <Select
                    options={maritalStates}
                    id="maritalState"
                    name="maritalState"
                    value={maritalState}
                    placeholder="Selecione o estado civil"
                    onChange={(evt) => setMaritalState(evt.value)}
                    disabled={!isEditing}
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
                disabled={!isEditing}
              />

              {
                maritalState.value === 'married' &&                            
                <div id={styles.partnerGroup}>                
                  <h3>
                    Dados pessoais do cônjuge
                      <FiEye className={styles.hide} onClick={() => handleHideData(styles.partnerGroup)} />
                      <FiEyeOff onClick={() => handleHideData(styles.partnerGroup)} />
                  </h3>
                  <div className={styles.hide}>                  
                    <div className={styles.clientInputs}>
                      <div id={styles.partnerName} className={styles.inputGroup}>
                        <label htmlFor="partnerName">Nome completo</label>
                        <input
                          type="text"
                          name="partnerName"
                          value={partnerName}
                          onChange={(evt) => setPartnerName(evt.target.value)}
                          placeholder="Digite o nome do cliente"
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                      disabled={!isEditing}
                    />
                  </div>
                </div>  
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
            <span>Ao confirmar, todos os dados do cliente {name} serão removidos do sistema.</span>
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
            <span>Prossiga para editar as informações do cliente {name}.</span>
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
            <span>Ao confirmar, você sairá do modo de edição para dos dados do cliente {name}.</span>
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
            <span>Ao confirmar, os dados do cliente {name} serão atualizados no sistema.</span>
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
              onClick={() => handleEditClient()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

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

      <div id="editOrNewProposalModal" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Proposta</h2>

          <span
            className={styles.closeBtn}
            onClick={() => toggleProposalModal()}
          >
            <FiXCircle />
          </span>

          <div className={styles.modalContent}>
            <p>Deseja gerar uma nova proposta, ou editar uma proposta já existente?</p>            

            <div className={styles.modalGroupBtn}>
              <button
                type="button"
                className={`${styles.outlineBtn} ${styles.btn}`}
                onClick={() => toggleProposalModals()}
              >
                Editar Proposta
              </button>

              <button
                type="button"
                className={styles.submitBtn}
                onClick={() => redirectToCreateProposal()}
              >
                Nova Proposta
              </button>
            </div>
          </div>

        </div>
      </div>

      <div id="editOrNewContractModal" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Contrato</h2>

          <span
            className={styles.closeBtn}
            onClick={() => toggleContractModal()}
          >
            <FiXCircle />
          </span>

          <div className={styles.modalContent}>
            <p>Deseja gerar uma nova proposta, ou editar uma proposta já existente?</p>

            <div className={styles.modalGroupBtn}>
              <button
                type="button"
                className={`${styles.outlineBtn} ${styles.btn}`}
                onClick={() => toggleContractModals()}
              >
                Editar Contrato
              </button>

              <button
                type="button"
                className={styles.submitBtn}
                onClick={() => toggleNewContractModals()}
              >
                Novo Contrato
              </button>
            </div>
          </div>

        </div>
      </div>

      <div id="selectProposalModal" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Editar proposta</h2>

          <span
            className={styles.closeBtn}
            onClick={() => toggleSelectEditProposal()}
          >
            <FiXCircle />
          </span>

          <div className={styles.modalContent}>
            <form>
              <div id={styles.newProject} className={styles.inputGroup}>
                <label htmlFor="proposal">Precatório</label>
                <Select
                  options={proposalList}
                  value={proposal}
                  id="proposal"
                  name="proposal"
                  placeholder="Selecione a proposta"
                  onChange={(evt) => setProposal(proposalList.find(proposal => proposal.value === evt.value))}
                />
              </div>

              <div className={styles.modalGroupBtn}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => toggleProposalModals()}
                >
                  Voltar
                </button>

                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={() => redirectToEditProposal()}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <div id="selectContractModal" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Editar contrato</h2>

          <span
            className={styles.closeBtn}
            onClick={() => toggleSelectContract()}
          >
            <FiXCircle />
          </span>

          <div className={styles.modalContent}>
            <form>
              <div id={styles.editContract} className={styles.inputGroup}>
                <label htmlFor="editContract">Precatório</label>
                <Select
                  options={contractList}
                  value={contract}
                  id="editContract"
                  name="editContract"
                  placeholder="Selecione o precatório do contrato"
                  onChange={(evt) => setContract(contractList.find(proposal => proposal.value === evt.value))}
                />
              </div>

              <div className={styles.modalGroupBtn}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => toggleContractModals()}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={() => redirectToEditContract()}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <div id="selectNewContractModal" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Cadastrar contrato</h2>

          <span
            className={styles.closeBtn}
            onClick={() => toggleSelectNewContract()}
          >
            <FiXCircle />
          </span>

          <div className={styles.modalContent}>
            <form>
              <div id={styles.newContract} className={styles.inputGroup}>
                <label htmlFor="newContract">Precatório</label>
                <Select
                  options={proposalList}
                  value={contract}
                  id="newContract"
                  name="newContract"
                  placeholder="Selecione o precatório do contrato"
                  onChange={(evt) => setContract(proposalList.find(contract => contract.value === evt.value))}
                />
              </div>

              <div className={styles.modalGroupBtn}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => toggleNewContractModals()}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={() => redirectToCreateContract()}
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