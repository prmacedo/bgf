import React, { useEffect, useState } from 'react';

import { FiUser, FiInfo } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';

import Container from '../../../components/Container';
import Select from '../../../components/Select';
import API_URL from '../../../config/api';
import { useUserData } from '../../../context/UserData';

import styles from './styles.module.css';

export default function Contract() {
  const { id, action, documentId } = useParams();

  const [option, setOption] = useState('');
  const [precatory, setPrecatory] = useState('');
  const [process, setProcess] = useState('');
  const [court, setCourt] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [proposalValue, setProposalValue] = useState(0);

  const [liquidValue, setLiquidValue] = useState(0);
  const [entity, setEntity] = useState('');
  const [farmCourt, setFarmCourt] = useState('');
  const [precatoryValue, setPrecatoryValue] = useState('');
  const [attorneyFee, setAttorneyFee] = useState(0);
  const [place, setPlace] = useState('');
  const [date, setDate] = useState();

  const [assigneeList, setAssigneeList] = useState([]);
  const [assignee, setAssignee] = useState();

  const options = [
    { value: 'BRV', label: 'BRV' },
    { value: 'BGF', label: 'BGF' }
  ];

  const { headers } = useUserData();

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

  const history = useHistory();

  async function handleSubmitContractForm() {
    const data = {
      type: option.value,
      precatory,
      process,
      court,
      percentage,
      proposalValue,
      assigneeId: assignee.value,
      entity,
      farmCourt,
      precatoryValue: Number(precatoryValue),
      attorneyFee: Number(attorneyFee),
      place,
      date: new Date(date)
    }

    console.log(data);

    try {
      const response = await API_URL.patch(`/document/${documentId}`, data, { headers });

      history.push(`/client/${id}/contract/${documentId}/revision`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  }

  async function getContract() {
    try {
      const response = await API_URL.get(`/document/${documentId}`, { headers });
      const { data } = response;

      const assigneeObj = {
        value: data.assignee.id,
        label: data.assignee.name
      }
      
      setOption(options.find(option => option.value === data.type));
      setPrecatory(data.precatory);
      setProcess(data.process);
      setCourt(data.court);
      setLiquidValue(data.liquidValue);
      setPercentage(data.percentage);
      setProposalValue(data.proposalValue);
      setAssignee(assigneeObj);

      if (action === 'edit') {
        setEntity(data.entity);
        setFarmCourt(data.farmCourt);
        setPrecatoryValue(data.precatoryValue);
        setAttorneyFee(data.attorneyFee);
        setPlace(data.place);
        setDate(data.contractDate.split('T')[0]);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setProposalValue(liquidValue * percentage / 100); 
  }, [percentage]);

  useEffect(() => {
    if (action !== 'edit' && action !== 'new') {
      history.push(`/client/${id}`);
    }
    
    getAssignee();
    getContract();
  }, []);

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
                <label htmlFor="fund">Cessionário</label>
                <Select
                  options={assigneeList}
                  id="assignee"
                  name="assignee"
                  placeholder="Escolha o Cessionário"
                  value={assignee}
                  onChange={(evt) => setAssignee(assigneeList.find(assignee => assignee.value === evt.value))}
                />
              </div>
              <div id={styles.optionGroup} className={styles.inputGroup}>
                <label htmlFor="option">BRV ou BGF?</label>
                <Select
                  id="option"
                  name="option"
                  options={options}
                  value={option}
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
                  disabled
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
                  type="number"
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
                  type="number"
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
                  type="text"
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
            <Link to={`/client/${id}`} className={`${styles.btn} ${styles.btnRed}`}>Voltar</Link>
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