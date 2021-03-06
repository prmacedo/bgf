import React, { useEffect, useState } from 'react';

import { FiUser, FiInfo} from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';

import Alert from '../../../components/CustomAlert';
import CircularProgress from '@mui/material/CircularProgress';

import API_URL from '../../../config/api';
import { useUserData } from '../../../context/UserData';

import styles from './styles.module.css';

export default function Proposal() {
  
  const [ client, setClient ] = useState();

  const { headers } = useUserData();

  const { id, proposalId } = useParams();

  const [assigneeList, setAssigneeList] = useState([]);

  const [ type, setType ] = useState('');
  const [ assignee, setAssignee ] = useState('');
  const [ date, setDate ] = useState();
  const [ precatory, setPrecatory ] = useState('');
  const [ process, setProcess ] = useState('');
  const [ place, setPlace ] = useState('');
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

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false)
  const [loadingDoc, setLoadingDoc] = useState(false)

  const types = [
    { value: 'BRV', label: 'BRV' },
    { value: 'BGF', label: 'BGF' }
  ];

  function formatMoney(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
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
      const response = await API_URL.patch(`/document/${proposalId}`, data, { headers });
      console.log(response);      
    } catch (error) {
      console.log(error);
    }
  }

  async function generatePDF() {
    setLoading(true);
        
    try {
      updateDocument();
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
      setMessage("Erro ao gerar PDF!")
      setSeverity("error")
      setOpen(true)
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function generateDOC() {
    setLoadingDoc(true);

    try {
      updateDocument();
      const response = await API_URL.get(`/download/proposal/docx/${proposalId}`, { headers, responseType: 'blob' })
        .then((response) => {
          // console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${date}-Proposta-${client}.docx`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      // console.log(response);
    } catch (error) {
      setMessage("Erro ao gerar PDF!")
      setSeverity("error")
      setOpen(true)
      console.log(error);
    } finally {
      setLoadingDoc(false);
    }
  }

  async function getProposal() {
    try {
      const response = await API_URL.get(`/document/${proposalId}`, { headers });
      const { data } = response;

      const assigneeObj = {
        value: data.assignee.id,
        label: data.assignee.name
      }

      console.log(data);

      setClient(data.client.name);
      setType(types.find(type => type.value === data.type));
      setAssignee(assigneeObj);
      setDate(data.proposalDate.split('T')[0]);
      setPrecatory(data.precatory);
      setProcess(data.process);
      setCourt(data.court);
      setPlace(data.place)

      setValue(data.value);
      setCorrection(data.correction);
      setFee(data.fee);
      setPreference(data.preference);
      setTaxes(data.taxes);
      setPercentage(data.percentage);
      setUpdatedValue(data.updatedValue);
      setLiquidValue(data.liquidValue);
      setProposalValue(data.proposalValue);
    } catch (error) {
      console.log(error);
    }
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
    getProposal();
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
                  value={client}
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
                  placeholder="Selecione uma op????o"                  
                  onChange={(evt) => setType(types.find(type => type.value === evt.value))}
                />
              </div>
              <div id={styles.fundGroup} className={styles.inputGroup}>
                <label htmlFor="assignee">Cession??rio</label>
                <Select
                  options={assigneeList}
                  id="assignee"
                  name="assignee"
                  placeholder="Escolha o Cession??rio"
                  value={assignee}
                  onChange={(evt) => setAssignee(assigneeList.find(assignee => assignee.value === evt.value))}  
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
                <label htmlFor="precatory">N?? do Precat??rio</label>
                <input
                  type="text"
                  id="precatory"
                  name="precatory"
                  placeholder="Digite o n?? do Precat??rio"
                  value={precatory}
                  onChange={(evt) => setPrecatory(evt.target.value)}
                />
              </div>
              <div id={styles.processGroup} className={styles.inputGroup}>
                <label htmlFor="process">N?? do Processo</label>
                <input
                  type="text"
                  id="process"
                  name="process"
                  placeholder="Digite o n?? do Processo"
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
                <label htmlFor="value">Valor Hist??rico - Bruto</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="value"
                  name="value"
                  placeholder="Digite o valor hist??rico bruto"
                  value={value}
                  onChange={(evt) => setValue(Number(evt.target.value))}
                />
              </div>
              <div id={styles.correctionGroup} className={styles.inputGroup}>
                <label htmlFor="correction">Corre????o</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="correction"
                  name="correction"
                  placeholder="Digite o valor da Corre????o"
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
                <label htmlFor="preference">Dedu????o - Prefer??ncia</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="preference"
                  name="preference"
                  placeholder="Digite o valor da Dedu????o - Prefer??ncia"
                  value={preference}
                  onChange={(evt) => setPreference(Number(evt.target.value))}
                />
              </div>
              <div id={styles.taxesGroup} className={styles.inputGroup}>
                <label htmlFor="taxes">Reten????o - Tributos</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="taxes"
                  name="taxes"
                  placeholder="Digite o valorda Reten????o - Tributos"
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
                    <td>Valor Hist??rico - Bruto <br/> (Principal - L??quido de Honor??rios)</td>
                    <td className={styles.tableNumber}>{formatMoney(value)}</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>Corre????o</td>
                    <td className={styles.tableNumber}>{formatMoney(correction)}</td>
                  </tr>
                  <tr>
                    <td>C</td>
                    <td>Juros</td>
                    <td className={styles.tableNumber}>{formatMoney(fee)}</td>
                  </tr>
                  <tr>
                    <td>D</td>
                    <td>Dedu????o - Prefer??ncia</td>
                    <td className={styles.tableNumber}>{formatMoney(preference)}</td>
                  </tr>
                  <tr>
                    <td>E</td>
                    <td>Valor Atualizado - Bruto <br /> (A+B+C-D)</td>
                    <td className={styles.tableNumber}>{formatMoney(updatedValue)}</td>
                  </tr>
                  <tr>
                    <td>F</td>
                    <td>Reten????o - Tributos</td>
                    <td className={styles.tableNumber}>{formatMoney(taxes)}</td>
                  </tr>
                  <tr>
                    <td>G</td>
                    <td>Valor L??quido (E-F)</td>
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
            <Link to={`/client/${id}`} className={`${styles.btn} ${styles.btnRed}`}>Voltar</Link>
            <button 
              type="button" 
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={() => generatePDF()}
              disabled={loading || loadingDoc}
            >
              {
                loading &&
                <CircularProgress color="inherit" size={16} />
              }
              Gerar PDF
              </button>
            <button 
              type="button" 
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={() => generateDOC()}
              disabled={loading || loadingDoc}
            >
              {
                loadingDoc &&
                <CircularProgress color="inherit" size={16} />
              }
              Gerar DOC
            </button>
          </div>

        </form>


      </main>

      <Alert
        severity={severity}
        message={message}
        variant="filled"
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
}