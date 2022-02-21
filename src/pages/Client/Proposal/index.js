import React, { useEffect, useState } from 'react';

import { FiUser, FiInfo} from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import API_URL from '../../../config/api';
import { useUserData } from '../../../context/UserData';

import styles from './styles.module.css';

export default function Proposal() {
  
  const client = JSON.parse(localStorage.getItem("client"));

  const { headers } = useUserData();

  const { id } = useParams();

  const [assigneeList, setAssigneeList] = useState([]);
  const [isNew, setIsNew] = useState(true);

  const [ documentId, setDocumentId ] = useState(0);

  const [ type, setType ] = useState('');
  const [ assignee, setAssignee ] = useState('');
  const [ date, setDate ] = useState();
  const [ precatory, setPrecatory ] = useState('');
  const [ process, setProcess ] = useState('');
  const [ court, setCourt ] = useState('');
  const [ place, setPlace ] = useState('');

  const [ value, setValue ] = useState();
  const [ correction, setCorrection ] = useState();
  const [ fee, setFee ] = useState();
  const [ preference, setPreference] = useState();
  const [ taxes, setTaxes ] = useState();
  const [ percentage, setPercentage ] = useState();
  const [ updatedValue, setUpdatedValue ] = useState();
  const [ liquidValue, setLiquidValue ] = useState();
  const [ proposalValue, setProposalValue ] = useState();

  const types = [
    { value: 'BRV', label: 'BRV' },
    { value: 'BGF', label: 'BGF' }
  ];

  function formatMoney(value) {
    if (value) 
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);        
    
    return 'R$ 0,00';
  }

  async function getAssignee() {
    try {
      const response = await API_URL.get('/assignees', { headers });

      const assignees = response.data.map(assignee => (
        {
          value: assignee.id,
          label: assignee.name
        }      
      ));

      console.log(response);
      console.log(assignees);

      setAssigneeList(assignees);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveDocument() {
    const data = {
      type: type.value,
      precatory,
      process,
      court,
      value,
      correction,
      fee,
      preference,
      taxes,
      percentage,
      updatedValue,
      liquidValue,
      proposalValue,
      place,
      proposalDate: new Date(date),
      clientId: client.id,
      assigneeId: assignee.value
    }
    
    try {
      const response = await API_URL.post('/document', data, { headers });
      console.log(response);

      setDocumentId(response.data.id);
      setIsNew(false);
      return response
    } catch (error) {
      console.log(error);
    }
  }

  async function updateDocument() {
    const data = {
      type: type.value,
      precatory,
      process,
      court,
      value,
      correction,
      fee,
      preference,
      taxes,
      percentage,
      updatedValue,
      liquidValue,
      proposalValue,
      place,
      proposalDate: new Date(date),
      clientId: client.id,
      assigneeId: assignee.value
    }

    try {
      const response = await API_URL.patch(`/document/${documentId}`, data, { headers });
      console.log(response);      
      return response
    } catch (error) {
      console.log(error);
    }
  }

  function updateOrSaveDocument() {
    if (!isNew) {
      return updateDocument();
    } else {
      return saveDocument();
    }
  }

  async function generatePDF() {
    const proposalId = (await updateOrSaveDocument()).data.id;

    try {
      const response = await API_URL.get(`/download/proposal/pdf/${proposalId}`, { headers, responseType: 'blob' })
        .then((response) => {
          // console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${date}-Proposta-${client}.pdf`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function generateDOC() {
    updateOrSaveDocument();
  }

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

  useEffect(() => {
    getAssignee();
  }, []);  

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
                <input 
                  type="text"
                  id="client"
                  name="client"
                  value={client.name}
                  disabled
                />
              </div>
              <div id={styles.optionGroup} className={styles.inputGroup}>
                <label htmlFor="type">BRV ou BGF?</label>
                <Select
                  id="type"
                  name="type"
                  options={types}
                  value={type}
                  placeholder="Selecione uma opção"                  
                  onChange={(evt) => setType(types.find(type => type.value === evt.target.value))}
                />
              </div>
              <div id={styles.fundGroup} className={styles.inputGroup}>
                <label htmlFor="assignee">Cessionário</label>
                <Select
                  options={assigneeList}
                  id="assignee"
                  name="assignee"
                  placeholder="Escolha o Cessionário"
                  value={assignee}
                  onChange={(evt) => setAssignee(assigneeList.find(assignee => assignee.value === evt.target.value))}  
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
              <div id={styles.placeGroup} className={styles.inputGroup}>
                <label htmlFor="place">Local</label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  placeholder="Digite o Local"
                  value={place}
                  onChange={(evt) => setPlace(evt.target.value)}
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
                  step="0.01"
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
                  step="0.01"
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
                  step="0.01"
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
                  step="0.01"
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
                  step="0.01"
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
                  step="0.01"
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
                    <td className={styles.tableNumber}>{percentage || 0}%</td>
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
            <Link to={`/client/${id}`} className={`${styles.btn} ${styles.btnRed}`}>Voltar</Link>
            <button 
              type="button" 
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={() => generatePDF()}
            >
              Gerar PDF
              </button>
            <button 
              type="button" 
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={() => generateDOC()}
            >
              Gerar DOC
            </button>
          </div>

        </form>


      </main>


    </Container>
  );
}