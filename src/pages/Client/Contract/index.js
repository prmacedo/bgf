import React, { useEffect, useState } from 'react';

import { FiUser, FiInfo } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import styles from './styles.module.css';

export default function Contract() {
  const [option, setOption] = useState('');
  const [fund, setFund] = useState('');
  const [precatory, setPrecatory] = useState('');
  const [process, setProcess] = useState('');
  const [court, setCourt] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [proposalValue, setProposalValue] = useState(0);

  const [entity, setEntity] = useState('');
  const [farmCourt, setFarmCourt] = useState('');
  const [precatoryValue, setPrecatoryValue] = useState('');
  const [attorneyFee, setAttorneyFee] = useState(0);
  const [place, setPlace] = useState('');
  const [date, setDate] = useState(new Date());

  const options = [
    { value: 'BRV', label: 'BRV' },
    { value: 'BGF', label: 'BGF' }
  ];

  const history = useHistory();

  function handleSubmitContractForm() {
    history.push('/contract/revision');
  }

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiUser />
          Gerar Contrato
        </h1>
      </header>

      <main className={styles.main}>
        <form action="">
          <div>
            <h2>Dados advindos da Proposta</h2>

            <div id={styles.proposalInputs}>                          
              <div id={styles.fundGroup} className={styles.inputGroup}>
                <label htmlFor="fund">Nome do fundo</label>
                <input
                  type="text"
                  id="fund"
                  name="fund"
                  placeholder="Digite o nome do fundo"
                  value={fund}
                  onChange={(evt) => setFund(evt.target.value)}
                />
              </div>
              <div id={styles.optionGroup} className={styles.inputGroup}>
                <label htmlFor="option">BRV ou BGF?</label>
                <Select
                  id="option"
                  name="option"
                  options={options}
                  placeholder="Selecione uma opção"
                  onChange={() => setOption()}
                />
              </div>
              <div id={styles.courtGroup} className={styles.inputGroup}>
                <label htmlFor="court">Tribunal</label>
                <input
                  type="text"
                  id="court"
                  name="court"
                  placeholder="Digite o nome do respectivo Tribunal"
                  value={court}
                  onChange={(evt) => setCourt(evt.target.value)}
                />
              </div>
              
              <div id={styles.processGroup} className={styles.inputGroup}>
                <label htmlFor="process">Ação Judicial</label>
                <input
                  type="text"
                  id="process"
                  name="process"
                  placeholder="Digite o nº da Ação Judicial"
                  value={process}
                  onChange={(evt) => setProcess(evt.target.value)}
                />
              </div>
              <div id={styles.precatoryGroup} className={styles.inputGroup}>
                <label htmlFor="precatory">Nº do Precatório</label>
                <input
                  type="text"
                  id="precatory"
                  name="precatory"
                  placeholder="Digite o nº do Precatório"
                  value={precatory}
                  onChange={(evt) => setPrecatory(evt.target.value)}
                />
              </div>
              <div id={styles.percentageGroup} className={styles.inputGroup}>
                <label htmlFor="percentage">Proposta %</label>
                <input
                  type="number"
                  id="percentage"
                  min="0"
                  name="percentage"
                  placeholder="0,00"
                  value={percentage}
                  onChange={(evt) => setPercentage(evt.target.value)}
                />
              </div>
              <div id={styles.proposalValueGroup} className={styles.inputGroup}>
                <label htmlFor="proposalValue">Proposta R$</label>
                <input
                  type="number"
                  id="proposalValue"
                  min="0"
                  name="proposalValue"
                  placeholder="0,00"
                  value={proposalValue}
                  onChange={(evt) => setProposalValue(evt.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h2>Dados do Contrato</h2>

            <div id={styles.contractInputs}>
              <div id={styles.entityGroup} className={styles.inputGroup}>
                <label htmlFor="entity">Ente Público</label>
                <input
                  type="text"
                  id="entity"
                  name="entity"
                  placeholder="Digite o nome da Instituição"
                  value={entity}
                  onChange={(evt) => setEntity(evt.target.value)}
                />
              </div>
              <div id={styles.farmCourtGroup} className={styles.inputGroup}>
                <label htmlFor="farmCourt">Vara da Fazenda</label>
                <input
                  type="text"
                  id="farmCourt"
                  name="farmCourt"
                  placeholder="Digite a Vara da Fazenda"
                  value={farmCourt}
                  onChange={(evt) => setFarmCourt(evt.target.value)}
                />
              </div>

              <div id={styles.precatoryValueGroup} className={styles.inputGroup}>
                <label htmlFor="precatoryValue">Valor de Face do Precatório</label>
                <input
                  type="text"
                  id="precatoryValue"
                  name="precatoryValue"
                  placeholder="Digite o valor"
                  value={precatoryValue}
                  onChange={(evt) => setPrecatoryValue(evt.target.value)}
                />
              </div>
              <div id={styles.attorneyFeeGroup} className={styles.inputGroup}>
                <label htmlFor="attorneyFee">Honorários Advocatícios %</label>
                <input
                  type="text"
                  id="attorneyFee"
                  name="attorneyFee"
                  placeholder="Digite o nº do Precatório"
                  value={attorneyFee}
                  onChange={(evt) => setAttorneyFee(evt.target.value)}
                />
              </div>
              <div id={styles.placeGroup} className={styles.inputGroup}>
                <label htmlFor="place">Local</label>
                <input
                  type="number"
                  id="place"
                  name="place"
                  placeholder="Digite o Local"
                  value={place}
                  onChange={(evt) => setPlace(evt.target.value)}
                />
              </div>
              <div id={styles.dateGroup} className={styles.inputGroup}>
                <label htmlFor="date">Data</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Digite a data"
                  value={date}
                  onChange={(evt) => { setDate(evt.target.value); console.log(evt.target.value); }}
                />
              </div>
            </div>
          </div>          

          <div className={styles.btnGroup}>
            <Link to="/client" className={`${styles.btn} ${styles.btnRed}`}>Voltar</Link>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={() => handleSubmitContractForm()}
            >
              Revisar
            </button>
          </div>

        </form>


      </main>


    </Container>
  );
}