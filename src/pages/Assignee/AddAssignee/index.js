import React, { useState } from 'react';

import { FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import AddressForm from '../../../components/AddressForm';

import { cnpjMask, telephoneMask } from '../../../utils/masks';

import API_URL from '../../../config/api';

import styles from './styles.module.css';
import { useUserData } from '../../../context/UserData';

export default function AddAssignee() {
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

  const { headers } = useUserData();

  function resetFields() {
    setName('');
    setCNPJ('');
    setEmail('');
    setTel('');

    setCEP('');
    setStreet('');
    setCity('');
    setUF('');
    setDistrict('');
    setComplement('');

    setAdminName('');
    setAdminCNPJ('');

    setAdminCEP('');
    setAdminStreet('');
    setAdminCity('');
    setAdminUF('');
    setAdminDistrict('');
    setAdminComplement('');
  }

  async function handleAddManagerSubmit(evt) {
    evt.preventDefault();

    let adminId;

    const adminData = {
      name: adminName,
      cnpj: adminCNPJ,
      cep: adminCEP,
      street: adminStreet,
      city: adminCity,
      uf: adminUF.value,
      district: adminDistrict,
      complement: adminComplement
    }

    try {
      const response = await API_URL.post('/admin', adminData, { headers });

      adminId = response.data.id;
    } catch (error) {
      console.log(error);
    }

    const data = {
      name,
      cnpj,
      email,
      telephone: tel,
      cep,
      street,
      city,
      uf: uf.value,
      district,
      complement,
      adminId
    }

    try {
      const response = await API_URL.post('/assignee', data, { headers });

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    resetFields();
  }

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiBriefcase />
          Cadastrar Cessionários
        </h1>
      </header>

      <main className={styles.main}>
        <h2>Dados do Cessionário</h2>
        <div className={styles.formContainer}>
          <form onSubmit={handleAddManagerSubmit}>
            <div className={styles.assigneeInputs}>
              <div id={styles.name} className={styles.inputGroup}>
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                  placeholder="Digite o nome do Cessionário"
                  required
                />
              </div>

              <div id={styles.cnpj} className={styles.inputGroup}>
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  type="text"
                  name="cnpj"
                  value={cnpj}
                  onChange={(evt) => setCNPJ(cnpjMask(evt.target.value))}
                  placeholder="00.000.000/0001-00"
                  required
                />
              </div>

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
                  onChange={(evt) => setTel(telephoneMask(evt.target.value))}
                  placeholder="(99) 99999-9999"
                  required
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
            />            

            <h2>Dados da Instituição Administradora do Cessionário</h2>

            <div className={styles.assigneeAdminInputs}>
              <div id={styles.adminName} className={styles.inputGroup}>
                <label htmlFor="adminName">Nome completo</label>
                <input
                  type="text"
                  name="adminName"
                  value={adminName}
                  onChange={(evt) => setAdminName(evt.target.value)}
                  placeholder="Digite o nome da Instituição"
                  required
                />
              </div>

              <div id={styles.adminCNPJ} className={styles.inputGroup}>
                <label htmlFor="adminCNPJ">CNPJ</label>
                <input
                  type="text"
                  name="adminCNPJ"
                  value={adminCNPJ}
                  onChange={(evt) => setAdminCNPJ(cnpjMask(evt.target.value))}
                  placeholder="00.000.000/0001-00"
                  required
                />
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
            />
                    
            <div className={styles.btnGroup}>
              <Link to="/managers" className={styles.cancelBtn}>Cancelar</Link>
              <button type="submit" className={styles.submitBtn}>Salvar cadastro</button>
            </div>
          </form>
        </div>
      </main>
    </Container>
  );
}