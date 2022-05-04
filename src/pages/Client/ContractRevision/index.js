import React, { useEffect, useState } from 'react';

import { FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';
import API_URL from '../../../config/api';
import { useUserData } from '../../../context/UserData';

import { cepMask, cnpjMask, cpfMask, rgMask, telephoneMask } from '../../../utils/masks';

import styles from './styles.module.css';

export default function ContractRevision() {
  const [isEditing, setIsEditing] = useState(false);

  const { documentId } = useParams();
  const { headers } = useUserData();

  const history = useHistory();

  // Client
  const [clientId, setClientId] = useState(0);

  const [name, setName] = useState('');  
  const [cpf, setCPF] = useState('');  
  const [maritalState, setMaritalState] = useState('');  
  const [nacionality, setNacionality] = useState('');  
  const [gender, setGender] = useState('');  
  const [email, setEmail] = useState('');  
  const [tel, setTel] = useState('');
  
  const [rg, setRG] = useState('');  
  const [profession, setProfession] = useState('');  
  const [cep, setCEP] = useState('');  
  const [city, setCity] = useState('');  
  const [uf, setUF] = useState('');  
  const [street, setStreet] = useState('');  
  const [district, setDistrict] = useState('');  
  const [complement, setComplement] = useState('');


  // Client's partner (if exists)
  const [partnerId, setPartnerId] = useState(0);

  const [partnerName, setPartnerName] = useState('');
  const [partnerCPF, setPartnerCPF] = useState('');
  const [partnerMaritalState, setPartnerMaritalState] = useState('');
  const [partnerNacionality, setPartnerNacionality] = useState('');
  const [partnerGender, setPartnerGender] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerTel, setPartnerTel] = useState('');
  
  const [partnerRG, setPartnerRG] = useState('');
  const [partnerProfession, setPartnerProfession] = useState('');
  const [partnerCEP, setPartnerCEP] = useState('');
  const [partnerCity, setPartnerCity] = useState('');
  const [partnerUF, setPartnerUF] = useState('');
  const [partnerStreet, setPartnerStreet] = useState('');
  const [partnerDistrict, setPartnerDistrict] = useState('');
  const [partnerComplement, setPartnerComplement] = useState('');
  

  // Assignee
  const [assigneeId, setAssigneeId] = useState(0);

  const [assigneeName, setAssigneeName] = useState('');
  const [assigneeCNPJ, setAssigneeCNPJ] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [assigneeTel, setAssigneeTel] = useState('');
  const [assigneeCEP, setAssigneeCEP] = useState('');
  const [assigneeCity, setAssigneeCity] = useState('');
  const [assigneeUF, setAssigneeUF] = useState('');
  const [assigneeStreet, setAssigneeStreet] = useState('');
  const [assigneeDistrict, setAssigneeDistrict] = useState('');
  const [assigneeComplement, setAssigneeComplement] = useState('');

  // Assignee's administration
  const [adminId, setAdminId] = useState(0);

  const [adminName, setAdminName] = useState('');
  const [adminCNPJ, setAdminCNPJ] = useState('');
  const [adminCEP, setAdminCEP] = useState('');
  const [adminCity, setAdminCity] = useState('');
  const [adminUF, setAdminUF] = useState('');
  const [adminStreet, setAdminStreet] = useState('');
  const [adminDistrict, setAdminDistrict] = useState('');
  const [adminComplement, setAdminComplement] = useState('');

  // Contract data
  const [entity, setEntity] = useState('');
  const [farmCourt, setFarmCourt] = useState('');
  const [precatoryValue, setPrecatoryValue] = useState('');
  const [attorneyFee, setAttorneyFee] = useState(0);
  const [place, setPlace] = useState('');
  const [date, setDate] = useState();
  const [court, setCourt] = useState('');
  const [option, setOption] = useState('');
  const [process, setProcess] = useState('');
  const [precatory, setPrecatory] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [liquidValue, setLiquidValue] = useState(0);
  const [proposalValue, setProposalValue] = useState(0);

  const options = [
    { value: 'BRV', label: 'BRV' },
    { value: 'BGF', label: 'BGF' }
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

  const maritalStates = [
    { value: 'single', label: 'Solteiro(a)' },
    { value: 'married', label: 'Casado(a)' },
    { value: 'separated', label: 'Separado(a)' },
    { value: 'divorced', label: 'Divorciado(a)' },
    { value: 'widowed', label: 'Viúvo(a)' }
  ];

  const marriageRegimes = [
    { value: 'separation', label: 'Separação de bens' },
    { value: 'partial', label: 'Comunhão Parcial' },
    { value: 'total', label: 'Comunhão Total' }
  ];

  const genders = [
    { value: 'F', label: 'Feminino' },
    { value: 'M', label: 'Masculino' }
  ];

  function stringToNumber(value) {
    let stringValue = String(value);
    return Number(stringValue.replace(',', '.'));
  }

  function handleHideData(id) {
    document.querySelector(`#${id} > div`).classList.toggle(`${styles.hide}`);
    const svgs = document.querySelectorAll(`#${id} > h2 > svg`);
    
    svgs[0].classList.toggle(styles.hide);
    svgs[1].classList.toggle(styles.hide);
  }

  function handleConfirmEdition() {
    setIsEditing(true);
    toggleHiddenModal('confirmDataCorrection');
  }

  function handleCancelEdition() {
    setIsEditing(false);
    toggleHiddenModal('confirmCancelEdition');
  }

  function toggleHiddenModal(id) {
    document.querySelector(`#${id}`).classList.toggle(styles.hide);
  }
  
  async function handleSaveEdition() {
    toggleHiddenModal('confirmSaveEdition');
    
    // Salvar alterações
    const dataDoc = {
      court,
      type: option.value,
      precatory,
      process,
      percentage,
      liquidValue,
      proposalValue,
      entity,
      farmCourt,
      precatoryValue,
      attorneyFee,
      place,
      contractDate: new Date(date),
    }

    const dataClient = {
      name,
      nationality: nacionality,
      gender: gender.value,
      rg,
      cpf,
      profession,
      telephone: tel,
      email,
      cep,
      city,
      street,
      uf: uf.value,
      district,
      complement,
      maritalStatus: maritalState.value,
    }

    const dataPartner = {
      name: partnerName,
      nationality: partnerNacionality,
      gender: partnerGender.value,
      rg: partnerRG,
      cpf: partnerCPF,
      profession: partnerProfession,
      telephone: partnerTel,
      email: partnerEmail,
      cep: partnerCEP,
      city: partnerCity,
      street: partnerStreet,
      uf: partnerUF.value,
      district: partnerDistrict,
      complement: partnerComplement,
      marriageRegime: partnerMaritalState.value,
    }

    const dataAssignee = {
      name: assigneeName,
      cnpj: assigneeCNPJ,
      email: assigneeEmail,
      telephone: assigneeTel,
      cep: assigneeCEP,
      city: assigneeCity,
      street: assigneeStreet,
      uf: assigneeUF.value,
      district: assigneeDistrict,
      complement: assigneeComplement,
    }

    const dataAdmin = {
      name: adminName,
      cnpj: adminCNPJ,
      cep: adminCEP,
      city: adminCity,
      street: adminStreet,
      uf: adminUF.value,
      district: adminDistrict,
      complement: adminComplement,
    }    


    try {
      const responseDoc = await API_URL.patch(`/document/${documentId}`, dataDoc, { headers });
      const responseClient = await API_URL.patch(`/client/${clientId}`, dataClient, { headers });
      
      if (maritalState.value === 'married') {
        const responsePartner = await API_URL.patch(`/partner/${partnerId}`, dataPartner, { headers });
        console.log(responsePartner);        
      }

      const responseAssignee = await API_URL.patch(`/assignee/${assigneeId}`, dataAssignee, { headers });
      const responseAdmin = await API_URL.patch(`/admin/${adminId}`, dataAdmin, { headers });

      console.log(responseDoc);
      console.log(responseClient);
      console.log(responseAssignee);
      console.log(responseAdmin);
    } catch (error) {
      console.log(error);
    }

    setIsEditing(false);
  }

  function setClientData(client) {
    setClientId(client.id);

    setName(client.name);
    setCPF(client.cpf);
    setMaritalState(maritalStates.find(maritalState => maritalState.value === client.maritalStatus));
    setNacionality(client.nationality);
    setGender(genders.find(gender => gender.value === client.gender));
    setEmail(client.email);
    setTel(client.telephone);

    setRG(client.rg);
    setProfession(client.profession);
    setCEP(client.cep);
    setCity(client.city);
    setUF(ufs.find(uf => uf.value === client.uf));
    setStreet(client.street);
    setDistrict(client.district);
    setComplement(client.complement);
  }

  function setPartnerData(partner) {
    console.log(marriageRegimes.find(marriageRegime => marriageRegime.value === partner.marriageRegime));
    setPartnerId(partner.id);

    setPartnerName(partner.name);
    setPartnerCPF(partner.cpf);
    setPartnerMaritalState(marriageRegimes.find(marriageRegime => marriageRegime.value === partner.marriageRegime));
    setPartnerNacionality(partner.nationality);
    setPartnerGender(genders.find(gender => gender.value === partner.gender));
    setPartnerEmail(partner.email);
    setPartnerTel(partner.telephone);

    setPartnerRG(partner.rg);
    setPartnerProfession(partner.profession);
    setPartnerCEP(partner.cep);
    setPartnerCity(partner.city);
    setPartnerUF(ufs.find(uf => uf.value === partner.uf));
    setPartnerStreet(partner.street);
    setPartnerDistrict(partner.district);
    setPartnerComplement(partner.complement);
  }

  function setAssigneeData(assignee) {
    setAssigneeId(assignee.id);

    setAssigneeName(assignee.name);
    setAssigneeCNPJ(assignee.cnpj);
    setAssigneeEmail(assignee.email);
    setAssigneeTel(assignee.telephone);
    setAssigneeCEP(assignee.cep);
    setAssigneeCity(assignee.city);
    setAssigneeUF(ufs.find(uf => uf.value === assignee.uf));
    setAssigneeStreet(assignee.street);
    setAssigneeDistrict(assignee.district);
    setAssigneeComplement(assignee.complement);
  }

  function setContractData(contract) {
    setEntity(contract.entity);
    setFarmCourt(contract.farmCourt);
    setPrecatoryValue(contract.precatoryValue);
    setAttorneyFee(contract.attorneyFee);
    setPlace(contract.place);
    setCourt(contract.court);
    setOption(options.find(option => option.value === contract.type));
    setProcess(contract.process);
    setPrecatory(contract.precatory);
    setPercentage(contract.percentage);
    setLiquidValue(contract.liquidValue);
    setProposalValue(contract.proposalValue);
    setDate(contract.contractDate.split("T")[0]);
  }

  function setAdminData(admin) {
    setAdminId(admin.id);
    setAdminName(admin.name);
    setAdminCNPJ(admin.cnpj);
    setAdminCEP(admin.cep);
    setAdminCity(admin.city);
    setAdminUF(ufs.find(uf => uf.value === admin.uf));
    setAdminStreet(admin.street);
    setAdminDistrict(admin.district);
    setAdminComplement(admin.complement);
  }

  async function getAllData() {
    try {
      const response = await API_URL.get(`/contract/${documentId}`, { headers });

      const { data } = response;

      setClientData(data.client);

      if (data.client.partner) {
        setPartnerData(data.client.partner)
      }

      setAssigneeData(data.assignee);
      setAdminData(data.assignee.admin);
      setContractData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function generatePDF() {
    try {
      const response = await API_URL.get(`/download/contract/pdf/${documentId}`, { headers, responseType: 'blob' })
        .then((response) => {
          // console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${date}-Contrato-${name}.pdf`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function generateDOC() {
    alert('doc');
  }

  useEffect(() => {
    const proposalValue = stringToNumber(liquidValue) * stringToNumber(percentage) / 100;
    setProposalValue(proposalValue);
  }, [percentage]);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <Container>
        <header className={styles.header}>
          <h1>
            <FiUser />
            Revisão dos dados do Contrato
          </h1>
        </header>

        <main className={styles.main}>
          <div className={styles.toolsRow}>
            {
              isEditing
              ?
              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGreen}`}
                  onClick={() => toggleHiddenModal('confirmSaveEdition')}
                >
                  Salvar correção
                </button>

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnRed}`}
                  onClick={() => toggleHiddenModal('confirmCancelEdition')}
                >
                  Cancelar edição
                </button>
              </div>
              :
              <button
                type="button"
                className={`${styles.btn} ${styles.btnOutlineGreen}`}
                onClick={() => toggleHiddenModal('confirmDataCorrection')}
              >
                Corrigir dados
              </button>
            }
          </div>

          <form action="">
            <div id={styles.clientGroup}>
              <h2>
                Dados do Cliente
                <FiEye onClick={() => handleHideData(styles.clientGroup)} />
                <FiEyeOff className={styles.hide} onClick={() => handleHideData(styles.clientGroup)} />
              </h2>

              <div id={styles.clientInputs}>
                <div id={styles.nameID} className={styles.inputGroup}>
                  <label htmlFor="name">Nome completo</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    placeholder="Digite o nome do cliente"
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div id={styles.nacionalityID} className={styles.inputGroup}>
                  <label htmlFor="nacionality">Nacionalidade</label>
                  <input
                    type="text"
                    name="nacionality"
                    value={nacionality}
                    onChange={(evt) => setNacionality(evt.target.value)}
                    placeholder="Digite a nacionalidade"
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div id={styles.genderID} className={styles.inputGroup}>
                  <label htmlFor="gender">Sexo biológico</label>
                  <Select
                    options={genders}
                    id="gender"
                    name="gender"
                    value={gender}
                    placeholder="Selecione o sexo"
                    onChange={(evt) => setGender(genders.find(gender => gender.value === evt.value))}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.maritalStateID} className={styles.inputGroup}>
                  <label htmlFor="maritalState">Estado Civil</label>
                  <Select
                    options={maritalStates}
                    id="maritalState"
                    name="maritalState"
                    value={maritalState}
                    placeholder="Selecione o estado civil"
                    onChange={(evt) => setMaritalState(maritalStates.find(maritalState => maritalState.value === evt.value))}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.professionID} className={styles.inputGroup}>
                  <label htmlFor="profession">Profissão</label>
                  <input
                    type="text"
                    name="profession"
                    value={profession}
                    onChange={(evt) => setProfession(evt.target.value)}
                    placeholder="Digite a profissão"
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div id={styles.rgID} className={styles.inputGroup}>
                  <label htmlFor="rg">RG</label>
                  <input
                    type="text"
                    name="rg"
                    value={rg}
                    onChange={(evt) => setRG(rgMask(evt.target.value))}
                    placeholder="Digite o RG"
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div id={styles.cpfID} className={styles.inputGroup}>
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={cpf}
                    onChange={(evt) => setCPF(cpfMask(evt.target.value))}
                    placeholder="Digite o CPF"
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div id={styles.emailID} className={styles.inputGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    placeholder="Digite o e-mail"
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div id={styles.telID} className={styles.inputGroup}>
                  <label htmlFor="tel">Telefone</label>
                  <input
                    type="text"
                    name="tel"
                    value={tel}
                    onChange={(evt) => setTel(telephoneMask(evt.target.value))}
                    placeholder="(99) 99999-9999"
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div id={styles.cepID} className={styles.inputGroup}>
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="text"
                    name="cep"
                    value={cep}
                    onChange={(evt) => setCEP(cepMask(evt.target.value))}
                    placeholder="Digite o CEP"
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.streetID} className={styles.inputGroup}>
                  <label htmlFor="street">Logradouro</label>
                  <input
                    type="text"
                    name="street"
                    value={street}
                    onChange={(evt) => setStreet(evt.target.value)}
                    placeholder="Digite o Logradouro"
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.cityID} className={styles.inputGroup}>
                  <label htmlFor="city">Cidade</label>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(evt) => setCity(evt.target.value)}
                    placeholder="Digite a cidade"
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.ufID} className={styles.inputGroup}>
                  <label htmlFor="uf">UF</label>
                  <Select
                    options={ufs}
                    id="uf"
                    name="uf"
                    placeholder="--"
                    value={uf}
                    onChange={(evt) => setUF(ufs.find(uf => uf.value === evt.value))}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.districtID} className={styles.inputGroup}>
                  <label htmlFor="district">Bairro</label>
                  <input
                    type="text"
                    name="district"
                    value={district}
                    onChange={(evt) => setDistrict(evt.target.value)}
                    placeholder="Digite o bairro"
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.complementID} className={styles.inputGroup}>
                  <label htmlFor="complement">Complemento</label>
                  <input
                    type="text"
                    name="complement"
                    value={complement}
                    onChange={(evt) => setComplement(evt.target.value)}
                    placeholder="Digite o complemento"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {
              maritalState.value === 'married' &&
              (
                <div id={styles.partnerGroup}>
                  <h2>
                    Dados do Cônjuge
                    <FiEye onClick={() => handleHideData(styles.partnerGroup)} />
                    <FiEyeOff className={styles.hide} onClick={() => handleHideData(styles.partnerGroup)} />
                  </h2>

                  <div id={styles.partnerInputs}>
                    <div id={styles.partnerNameID} className={styles.inputGroup}>
                      <label htmlFor="partnerName">Nome completo</label>
                      <input
                        type="text"
                        name="partnerName"
                        value={partnerName}
                        onChange={(evt) => setPartnerName(evt.target.value)}
                        placeholder="Digite o nome do cônjuge"
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div id={styles.partnerNacionalityID} className={styles.inputGroup}>
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

                    <div id={styles.partnerGenderID} className={styles.inputGroup}>
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

                    <div id={styles.partnerMaritalStateID} className={styles.inputGroup}>
                      <label htmlFor="partnerMaritalState">Regime de Casamento</label>
                      <Select
                        options={marriageRegimes}
                        id="partnerMaritalState"
                        name="partnerMaritalState"
                        placeholder="Selecione o regime"
                        disabled={!isEditing}
                        value={partnerMaritalState}
                        onChange={(evt) => setPartnerMaritalState(marriageRegimes.find(marriageRegime => marriageRegime.value === evt.value))}
                      />
                    </div>

                    <div id={styles.partnerProfessionID} className={styles.inputGroup}>
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

                    <div id={styles.partnerRGID} className={styles.inputGroup}>
                      <label htmlFor="partnerRG">RG</label>
                      <input
                        type="text"
                        name="partnerRG"
                        value={partnerRG}
                        onChange={(evt) => setPartnerRG(rgMask(evt.target.value))}
                        placeholder="Digite o RG"
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div id={styles.partnerCPFID} className={styles.inputGroup}>
                      <label htmlFor="partnerCPF">CPF</label>
                      <input
                        type="text"
                        name="partnerCPF"
                        value={partnerCPF}
                        onChange={(evt) => setPartnerCPF(cpfMask(evt.target.value))}
                        placeholder="Digite o CPF"
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div id={styles.partnerEmailID} className={styles.inputGroup}>
                      <label htmlFor="partnerEmail">E-mail</label>
                      <input
                        type="email"
                        name="partnerEmail"
                        value={partnerEmail}
                        onChange={(evt) => setPartnerEmail(evt.target.value)}
                        placeholder="Digite o e-mail"
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div id={styles.partnerTelID} className={styles.inputGroup}>
                      <label htmlFor="partnerTel">Telefone</label>
                      <input
                        type="text"
                        name="partnerTel"
                        value={partnerTel}
                        onChange={(evt) => setPartnerTel(telephoneMask(evt.target.value))}
                        placeholder="(99) 99999-9999"
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div id={styles.partnerCEPID} className={styles.inputGroup}>
                      <label htmlFor="partnerCEP">CEP</label>
                      <input
                        type="text"
                        name="partnerCEP"
                        value={partnerCEP}
                        onChange={(evt) => setPartnerCEP(cepMask(evt.target.value))}
                        placeholder="Digite o CEP"
                        disabled={!isEditing}
                      />
                    </div>

                    <div id={styles.partnerStreetID} className={styles.inputGroup}>
                      <label htmlFor="partnerStreet">Logradouro</label>
                      <input
                        type="text"
                        name="partnerStreet"
                        value={partnerStreet}
                        onChange={(evt) => setPartnerStreet(evt.target.value)}
                        placeholder="Digite o Logradouro"
                        disabled={!isEditing}
                      />
                    </div>

                    <div id={styles.partnerCityID} className={styles.inputGroup}>
                      <label htmlFor="partnerCity">Cidade</label>
                      <input
                        type="text"
                        name="partnerCity"
                        value={partnerCity}
                        onChange={(evt) => setPartnerCity(evt.target.value)}
                        placeholder="Digite a cidade"
                        disabled={!isEditing}
                      />
                    </div>

                    <div id={styles.partnerUFID} className={styles.inputGroup}>
                      <label htmlFor="partnerUF">UF</label>
                      <Select
                        options={ufs}
                        id="partnerUF"
                        name="partnerUF"
                        placeholder="--"
                        disabled={!isEditing}
                        value={partnerUF}
                        onChange={(evt) => setPartnerUF(ufs.find(uf => uf.value === evt.value))}
                      />
                    </div>

                    <div id={styles.partnerDistrictID} className={styles.inputGroup}>
                      <label htmlFor="partnerDistrict">Bairro</label>
                      <input
                        type="text"
                        name="partnerDistrict"
                        value={partnerDistrict}
                        onChange={(evt) => setPartnerDistrict(evt.target.value)}
                        placeholder="Digite o bairro"
                        disabled={!isEditing}
                      />
                    </div>

                    <div id={styles.partnerComplementID} className={styles.inputGroup}>
                      <label htmlFor="partnerComplement">Complemento</label>
                      <input
                        type="text"
                        name="partnerComplement"
                        value={partnerComplement}
                        onChange={(evt) => setPartnerComplement(evt.target.value)}
                        placeholder="Digite o complemento"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              )
            }

            <div id={styles.assigneeGroup}>
              <h2>
                Dados do Cessionário
                <FiEye onClick={() => handleHideData(styles.assigneeGroup)} />
                <FiEyeOff className={styles.hide} onClick={() => handleHideData(styles.assigneeGroup)} />
              </h2>

              <div id={styles.assigneeInputs}>
                <div id={styles.assigneeNameID} className={styles.inputGroup}>
                  <label htmlFor="assigneeName">Nome completo</label>
                  <input
                    type="text"
                    name="assigneeName"
                    id="assigneeName"
                    value={assigneeName}
                    onChange={(evt) => setAssigneeName(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o nome do Cessionário"
                    required
                  />
                </div>

                <div id={styles.assigneeCNPJID} className={styles.inputGroup}>
                  <label htmlFor="assigneeCNPJ">CNPJ</label>
                  <input
                    type="text"
                    name="assigneeCNPJ"
                    id="assigneeCNPJ"
                    value={assigneeCNPJ}
                    onChange={(evt) => setAssigneeCNPJ(cnpjMask(evt.target.value))}
                    disabled={!isEditing}
                    placeholder="00.000.000/0001-00"
                    required
                  />
                </div>

                <div id={styles.assigneeEmailID} className={styles.inputGroup}>
                  <label htmlFor="assigneeEmailID">E-mail</label>
                  <input
                    type="email"
                    name="assigneeEmail"
                    id="assigneeEmail"
                    value={assigneeEmail}
                    onChange={(evt) => setAssigneeEmail(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o e-mail"
                    required
                  />
                </div>

                <div id={styles.assigneeTelID} className={styles.inputGroup}>
                  <label htmlFor="assigneeTel">Telefone</label>
                  <input
                    type="text"
                    name="assigneeTel"
                    id="assigneeTel"
                    value={assigneeTel}
                    onChange={(evt) => setAssigneeTel(telephoneMask(evt.target.value))}
                    disabled={!isEditing}
                    placeholder="(99) 99999-9999"
                  />
                </div>

                <div id={styles.assigneeCEPID} className={styles.inputGroup}>
                  <label htmlFor="assigneeCEP">CEP</label>
                  <input
                    type="text"
                    name="assigneeCEP"
                    value={assigneeCEP}
                    onChange={(evt) => setAssigneeCEP(cepMask(evt.target.value))}
                    disabled={!isEditing}
                    placeholder="Digite o CEP"
                  />
                </div>

                <div id={styles.assigneeStreetID} className={styles.inputGroup}>
                  <label htmlFor="assigneeStreet">Logradouro</label>
                  <input
                    type="text"
                    name="assigneeStreet"
                    value={assigneeStreet}
                    onChange={(evt) => setAssigneeStreet(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o Logradouro"
                  />
                </div>

                <div id={styles.assigneeCityID} className={styles.inputGroup}>
                  <label htmlFor="assigneeCity">Cidade</label>
                  <input
                    type="text"
                    name="assigneeCity"
                    value={assigneeCity}
                    onChange={(evt) => setAssigneeCity(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite a cidade"
                  />
                </div>

                <div id={styles.assigneeUFID} className={styles.inputGroup}>
                  <label htmlFor="assigneeUF">UF</label>
                  <Select
                    options={ufs}
                    id="assigneeUF"
                    name="assigneeUF"
                    disabled={!isEditing}
                    placeholder="--"
                    value={assigneeUF}
                    onChange={(evt) => setAssigneeUF(ufs.find(uf => uf.value === evt.value))}
                  />
                </div>

                <div id={styles.assigneeDistrictID} className={styles.inputGroup}>
                  <label htmlFor="assigneeDistrict">Bairro</label>
                  <input
                    type="text"
                    name="assigneeDistrict"
                    value={assigneeDistrict}
                    onChange={(evt) => setAssigneeDistrict(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o bairro"
                  />
                </div>

                <div id={styles.assigneeComplementID} className={styles.inputGroup}>
                  <label htmlFor="assigneeComplement">Complemento</label>
                  <input
                    type="text"
                    name="assigneeComplement"
                    value={assigneeComplement}
                    onChange={(evt) => setAssigneeComplement(evt.target.value)}
                    disabled={!isEditing}
                    placeholder="Digite o complemento"
                  />
                </div>
              </div>
            </div>

            <div id={styles.adminGroup}>
              <h2>
                Dados da Instituição Administradora do Cessionário
                <FiEye onClick={() => handleHideData(styles.adminGroup)} />
                <FiEyeOff className={styles.hide} onClick={() => handleHideData(styles.adminGroup)} />
              </h2>

              <div id={styles.assigneeAdminInputs}>
                <div id={styles.adminNameID} className={styles.inputGroup}>
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
                </div>

                <div id={styles.adminCNPJID} className={styles.inputGroup}>
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
                </div>

                <div id={styles.adminCEPID} className={styles.inputGroup}>
                  <label htmlFor="adminCEP">CEP</label>
                  <input
                    type="text"
                    name="adminCEP"
                    value={adminCEP}
                    onChange={(evt) => setAdminCEP(cepMask(evt.target.value))}
                    disabled={!isEditing}
                    placeholder="Digite o CEP"
                  />
                </div>

                <div id={styles.adminStreetID} className={styles.inputGroup}>
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

                <div id={styles.adminCityID} className={styles.inputGroup}>
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

                <div id={styles.adminUFID} className={styles.inputGroup}>
                  <label htmlFor="adminUF">UF</label>
                  <Select
                    options={ufs}
                    id="adminUF"
                    name="adminUF"
                    disabled={!isEditing}
                    placeholder="--"
                    value={adminUF}
                    onChange={(evt) => setAdminUF(ufs.find(uf => uf.value === evt.value))}
                  />
                </div>

                <div id={styles.adminDistrictID} className={styles.inputGroup}>
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

                <div id={styles.adminComplementID} className={styles.inputGroup}>
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
            </div>

            <div id={styles.contractGroup}>
              <h2>
                Dados do Contrato
                <FiEye onClick={() => handleHideData(styles.contractGroup)} />
                <FiEyeOff className={styles.hide} onClick={() => handleHideData(styles.contractGroup)} />
              </h2>

              <div id={styles.contractInputs}>
                <div id={styles.optionID} className={styles.inputGroup}>
                  <label htmlFor="option">BRV ou BGF?</label>
                  <Select
                    id="option"
                    name="option"
                    options={options}
                    placeholder="Selecione uma opção"
                    onChange={(evt) => setOption(options.find(option => option.value === evt.value))}
                    value={option}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.courtID} className={styles.inputGroup}>
                  <label htmlFor="court">Tribunal</label>
                  <input
                    type="text"
                    id="court"
                    name="court"
                    placeholder="Digite o nome do respectivo Tribunal"
                    value={court}
                    onChange={(evt) => setCourt(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.processID} className={styles.inputGroup}>
                  <label htmlFor="process">Ação Judicial</label>
                  <input
                    type="text"
                    id="process"
                    name="process"
                    placeholder="Digite o nº da Ação Judicial"
                    value={process}
                    onChange={(evt) => setProcess(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.precatoryID} className={styles.inputGroup}>
                  <label htmlFor="precatory">Nº do Precatório</label>
                  <input
                    type="text"
                    id="precatory"
                    name="precatory"
                    placeholder="Digite o nº do Precatório"
                    value={precatory}
                    onChange={(evt) => setPrecatory(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.percentageID} className={styles.inputGroup}>
                  <label htmlFor="percentage">Proposta %</label>
                  <input
                    type="number"
                    step="0.01"
                    id="percentage"
                    min="0"
                    name="percentage"
                    placeholder="0,00"
                    value={percentage}
                    onChange={(evt) => setPercentage(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.proposalValueID} className={styles.inputGroup}>
                  <label htmlFor="proposalValue">Proposta R$</label>
                  <input
                    type="number"
                    step="0.01"
                    id="proposalValue"
                    min="0"
                    name="proposalValue"
                    placeholder="0,00"
                    value={proposalValue}
                    onChange={(evt) => setProposalValue(evt.target.value)}
                    disabled
                  />
                </div>

                <div id={styles.entityID} className={styles.inputGroup}>
                  <label htmlFor="entity">Ente Público</label>
                  <input
                    type="text"
                    id="entity"
                    name="entity"
                    placeholder="Digite o nome da Instituição"
                    value={entity}
                    onChange={(evt) => setEntity(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.farmCourtID} className={styles.inputGroup}>
                  <label htmlFor="farmCourt">Vara da Fazenda</label>
                  <input
                    type="text"
                    id="farmCourt"
                    name="farmCourt"
                    placeholder="Digite a Vara da Fazenda"
                    value={farmCourt}
                    onChange={(evt) => setFarmCourt(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.precatoryValueID} className={styles.inputGroup}>
                  <label htmlFor="precatoryValue">Valor de Face do Precatório</label>
                  <input
                    type="number"
                    step="0.01"
                    id="precatoryValue"
                    name="precatoryValue"
                    placeholder="Digite o valor"
                    value={precatoryValue}
                    onChange={(evt) => setPrecatoryValue(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.attorneyFeeID} className={styles.inputGroup}>
                  <label htmlFor="attorneyFee">Honorários Advocatícios %</label>
                  <input
                    type="number"
                    step="0.01"
                    id="attorneyFee"
                    name="attorneyFee"
                    placeholder="Digite o valor"
                    value={attorneyFee}
                    onChange={(evt) => setAttorneyFee(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.placeID} className={styles.inputGroup}>
                  <label htmlFor="place">Local</label>
                  <input
                    type="text"
                    id="place"
                    name="place"
                    placeholder="Digite o Local"
                    value={place}
                    onChange={(evt) => setPlace(evt.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div id={styles.dateID} className={styles.inputGroup}>
                  <label htmlFor="date">Data</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    placeholder="Digite a data"
                    value={date}
                    onChange={(evt) => { setDate(evt.target.value); console.log(evt.target.value); }}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className={styles.btnGroup}>
              <p 
                onClick={() => history.goBack()}
                className={`${styles.btn} ${styles.btnRed} ${isEditing ? styles.disabled : null}`}
              >
                Voltar
              </p>

              <button 
                type="button"
                className={`${styles.btn} ${styles.btnGreen}`}
                disabled={isEditing}
                onClick={() => generatePDF()}
              >
                Gerar PDF
              </button>

              <button
                type="button" 
                className={`${styles.btn} ${styles.btnGreen}`}
                disabled={isEditing}
                onClick={() => generateDOC()}
              >
                Gerar DOC
              </button>
            </div>
          </form>

        </main>
      </Container>

      <div id="confirmDataCorrection" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Deseja corrigir as informações?</h2>

          <div className={styles.modalContent}>
            <span>Confirme para editar as informações.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnRed}`}
              onClick={() => toggleHiddenModal('confirmDataCorrection')}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={() => handleConfirmEdition()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <div id="confirmCancelEdition" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Deseja sair do modo de edição?</h2>

          <div className={styles.modalContent}>
            <span>Confirme para sair do modo de edição .</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnRed}`}
              onClick={() => toggleHiddenModal('confirmCancelEdition')}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={() => handleCancelEdition()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <div id="confirmSaveEdition" className={`${styles.modalContainer} ${styles.hide}`}>
        <div className={styles.modal}>
          <h2>Confirmar alterações?</h2>

          <div className={styles.modalContent}>
            <span>Ao confirmar os dados do Contrato serão atualizados.</span>
          </div>

          <div className={styles.modalGroupBtn}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnRed}`}
              onClick={() => toggleHiddenModal('confirmSaveEdition')}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={() => handleSaveEdition()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}