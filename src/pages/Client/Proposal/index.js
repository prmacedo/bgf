import React, { useEffect, useState } from 'react';

import { FiUser, FiInfo} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import styles from './styles.module.css';

export default function Proposal() {
  const [ clients, setClients] = useState({});
  const [ option, setOption ] = useState('');
  const [ fund, setFund ] = useState('');
  const [ date, setDate ] = useState();
  const [ precatory, setPrecatory ] = useState('');
  const [ process, setProcess ] = useState('');
  const [ court, setCourt ] = useState('');

  const [ value, setValue ] = useState(0);
  const [ correction, setCorrection ] = useState(0);
  const [ fee, setFee ] = useState(0);
  const [ preference, setPreference] = useState(0);
  const [ taxes, setTaxes ] = useState(0);
  const [ percentage, setPercentage ] = useState(0);
  const [ updatedValue, setUpdatedValue ] = useState(0);
  const [ liquidValue, setLiquidValue ] = useState(0);
  const [ proposalValue, setProposalValue ] = useState(0);

  const options = [
    { value: 'BRV', label: 'BRV' },
    { value: 'BGF', label: 'BGF' }
  ];

  useEffect(() => {
    const updatedValue = value + correction + fee - preference;
    setUpdatedValue(updatedValue);
  }, [value, correction, fee, preference]);

  useEffect(() => {
    const liquidValue = updatedValue - taxes;
    setLiquidValue(liquidValue);
  }, [updatedValue, taxes]);

  useEffect(() => {
    const proposalValue = liquidValue * percentage / 100;
    setProposalValue(proposalValue);
  }, [liquidValue, percentage]);

  function formatMoney(value) {
    const formatedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    return formatedValue;
  }

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          <FiUser />
          Gerar Proposta
        </h1>
      </header>

      <main className={styles.main}>
        <form action="">
          <div>
            <h2>Dados gerais da Proposta</h2>

            <div id={styles.proposalInputs}>
              <div id={styles.clientGroup} className={styles.inputGroup}>
                <label htmlFor="client">Cliente</label>
                <Select 
                  id="client"
                  name="client"
                  options={clients}
                  placeholder="Selecione o cliente"
                  onChange={() => setClients()}
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
              <div id={styles.processGroup} className={styles.inputGroup}>
                <label htmlFor="process">Nº do Processo</label>
                <input
                  type="text"
                  id="process"
                  name="process"
                  placeholder="Digite o nº do Processo"
                  value={process}
                  onChange={(evt) => setProcess(evt.target.value)}
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
            </div>
          </div>
          <div>
            <h2>Dados do Quadro da Proposta</h2>

            <div id={styles.frameInputs}>              
              <div id={styles.valueGroup} className={styles.inputGroup}>
                <label htmlFor="value">Valor Histórico - Bruto</label>
                <input
                  type="number"
                  min="0"
                  id="value"
                  name="value"
                  placeholder="Digite o valor histórico bruto"
                  value={value}
                  onChange={(evt) => setValue(Number(evt.target.value))}
                />
              </div>
              <div id={styles.correctionGroup} className={styles.inputGroup}>
                <label htmlFor="correction">Correção</label>
                <input
                  type="number"
                  min="0"
                  id="correction"
                  name="correction"
                  placeholder="Digite o valor da Correção"
                  value={correction}
                  onChange={(evt) => { setCorrection(Number(evt.target.value)); }}
                />
              </div>
              <div id={styles.feeGroup} className={styles.inputGroup}>
                <label htmlFor="fee">Juros</label>
                <input
                  type="number"
                  min="0"
                  id="fee"
                  name="fee"
                  placeholder="Digite o valor dos Juros"
                  value={fee}
                  onChange={(evt) => setFee(Number(evt.target.value))}
                />
              </div>
              <div id={styles.preferenceGroup} className={styles.inputGroup}>
                <label htmlFor="preference">Dedução - Preferência</label>
                <input
                  type="number"
                  min="0"
                  id="preference"
                  name="preference"
                  placeholder="Digite o valor da Dedução - Preferência"
                  value={preference}
                  onChange={(evt) => setPreference(Number(evt.target.value))}
                />
              </div>
              <div id={styles.taxesGroup} className={styles.inputGroup}>
                <label htmlFor="taxes">Retenção - Tributos</label>
                <input
                  type="number"
                  min="0"
                  id="taxes"
                  name="taxes"
                  placeholder="Digite o valorda Retenção - Tributos"
                  value={taxes}
                  onChange={(evt) => setTaxes(Number(evt.target.value))}
                />
              </div>
              <div id={styles.percentageGroup} className={styles.inputGroup}>
                <label htmlFor="percentage">Proposta %</label>
                <input
                  type="number"
                  min="0"
                  id="percentage"
                  name="percentage"
                  placeholder="Digite a porcentagem"
                  value={percentage}
                  onChange={(evt) => setPercentage(Number(evt.target.value))}
                />
              </div>
            </div>
          </div>

          <div id={styles.frameContainer}>
            <div id={styles.frame}>
              <h3>Proposta BRV/SAFRA</h3>
              <table>
                <tbody>
                  <tr>
                    <td>A</td>
                    <td>Valor Histórico - Bruto <br/> (Principal - Líquido de Honorários)</td>
                    <td className={styles.tableNumber}>{formatMoney(value)}</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>Correção</td>
                    <td className={styles.tableNumber}>{formatMoney(correction)}</td>
                  </tr>
                  <tr>
                    <td>C</td>
                    <td>Juros</td>
                    <td className={styles.tableNumber}>{formatMoney(fee)}</td>
                  </tr>
                  <tr>
                    <td>D</td>
                    <td>Dedução - Preferência</td>
                    <td className={styles.tableNumber}>{formatMoney(preference)}</td>
                  </tr>
                  <tr>
                    <td>E</td>
                    <td>Valor Atualizado - Bruto <br /> (A+B+C-D)</td>
                    <td className={styles.tableNumber}>{formatMoney(updatedValue)}</td>
                  </tr>
                  <tr>
                    <td>F</td>
                    <td>Retenção - Tributos</td>
                    <td className={styles.tableNumber}>{formatMoney(taxes)}</td>
                  </tr>
                  <tr>
                    <td>G</td>
                    <td>Valor Líquido (E-F)</td>
                    <td className={styles.tableNumber}>{formatMoney(liquidValue)}</td>
                  </tr>
                  <tr>
                    <td>H</td>
                    <td>Proposta %</td>
                    <td className={styles.tableNumber}>{percentage}%</td>
                  </tr>
                  <tr>
                    <td>I</td>
                    <td>Proposta R$</td>
                    <td className={styles.tableNumber}>{formatMoney(proposalValue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.btnGroup}>
            <Link to="/client" className={`${styles.btn} ${styles.btnRed}`}>Voltar</Link>
            <button type="button" className={`${styles.btn} ${styles.btnGreen}`}>Gerar PDF</button>
            <button type="button" className={`${styles.btn} ${styles.btnGreen}`}>Gerar DOC</button>
          </div>

        </form>


      </main>


    </Container>
  );
}