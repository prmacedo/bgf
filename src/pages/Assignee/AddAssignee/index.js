import React, { useState } from 'react';

import { FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import AddressForm from '../../../components/AddressForm';

import styles from './styles.module.css';

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

  function handleSearchCEP() {
    // Chamar API de CEP
  }

  function handleSearchAdminCEP() {
    // Chamar APi de CEP
  }

  function handleAddManagerSubmit(evt) {
    evt.preventDefault();
    console.log(cep)
    console.log(street)
    console.log(city)
    console.log(uf)
    console.log(district)
    console.log(complement)
    console.log(adminCEP)
    console.log(adminStreet)
    console.log(adminCity)
    console.log(adminUF)
    console.log(adminDistrict)
    console.log(adminComplement)
  }

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

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiBriefcase />
          Cadastrar Gerentes
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
                  onChange={(evt) => setCNPJ(evt.target.value)}
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
                  onChange={(evt) => setTel(evt.target.value)}
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

            {/* <h3>Endereço do Cessionário</h3>

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
                  className={styles.cepBtn}
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
                    options={options}
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
            </div> */}

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
                  onChange={(evt) => setAdminCNPJ(evt.target.value)}
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

            {/* <h3>Endereço da Instituição Administradora</h3>

            <div className={styles.addressInputs}>
              <div className={styles.cepGroup}>
                <div id={styles.adminCEP} className={styles.inputGroup}>
                  <label htmlFor="adminCEP">CEP</label>
                  <input
                    type="text"
                    name="adminCEP"
                    value={adminCEP}
                    onChange={(evt) => setAdminCEP(evt.target.value)}
                    placeholder="Digite o CEP"
                  />
                </div>

                <button 
                  type="button"
                  className={styles.cepBtn}
                  onClick={() => handleSearchAdminCEP()}  
                >
                  Buscar pelo CEP
                </button>
              </div>

              <div className={styles.addressGroup}>
                <div id={styles.adminStreet} className={styles.inputGroup}>
                  <label htmlFor="adminStreet">Logradouro</label>
                  <input
                    type="text"
                    name="adminStreet"
                    value={adminStreet}
                    onChange={(evt) => setAdminStreet(evt.target.value)}
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
                    placeholder="Digite a cidade"
                  />
                </div>

                <div id={styles.adminUF} className={styles.inputGroup}>
                  <label htmlFor="adminUF">UF</label>
                  <Select
                    options={options}
                    id="adminUF"
                    name="adminUF"
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
                    placeholder="Digite o complemento"
                  />
                </div>
              </div>
            </div> */}
                    
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