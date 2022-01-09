import React, { useState } from 'react';

import Select from '../Select';
import axios from 'axios';

import styles from './styles.module.css';

export default function AddressForm({ title, cep, setCEP, street, setStreet, city, setCity, uf, setUF, district, setDistrict, complement, setComplement, disabled = false }) {  
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

  async function handleSearchCEP() {
    // Chamar API de CEP
    const formatedCEP = cep.replace('.', '').replace('-', '');

    if (formatedCEP.length === 8) {
      const response = await axios.get(`https://viacep.com.br/ws/${formatedCEP}/json/`);

      if (!response.data.erro) {
        const { data } = response;
  
        setCity(data.localidade);
        setUF(data.uf);
        setDistrict(data.bairro);
        setStreet(data.logradouro);
        setComplement(data.complemento);
      } 

      console.log(response);

    } else {
      console.log("CEP inválido");
    }

  }

  return(
    <>
      <h3>{ title }</h3>

      <div className={!disabled ? styles.addressInputsEditing : styles.addressInputs}>
        <div className={`${styles.cepGroup} ${!disabled ? null : styles.hide}`}>
          <div id={styles.cepSearch} className={styles.inputGroup}>
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              name="cep"
              id="cep"
              value={cep}
              onChange={(evt) => setCEP(evt.target.value)}
              disabled={disabled}
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
          <div id={styles.cep} className={`${styles.inputGroup} ${!disabled ? styles.hide : null}`}>
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              name="cep"
              id="cep"
              value={cep}
              onChange={(evt) => setCEP(evt.target.value)}
              disabled={disabled}
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
              placeholder="Digite o Logradouro"
              disabled={disabled}
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
              disabled={disabled}
            />
          </div>

          <div id={styles.uf} className={styles.inputGroup}>
            <label htmlFor="uf">UF</label>
            <Select
              options={ufs}
              id="uf"
              name="uf"
              placeholder="--"
              value={uf}
              onChange={(evt) => setUF(evt.value)}
              type="cep"
              disabled={disabled}
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
              disabled={disabled}
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
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </>
  );
}