import { useState } from 'react'
import styles from './styles.module.scss'
import './App.css'
import Saldo from './components/Saldo';
import TabelaTransacoes from './components/TabelaTransacoes';
import "react-datepicker/dist/react-datepicker.css";


function App() {

  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [nome, setNome] = useState("");
  const [dataInicioInput, setDataInicioInput] = useState("");
  const [dataTerminoInput, setDataTerminoInput] = useState("");

  return (
  <div className={styles.container}>

    <form className={styles.dadosPesquisaForm}>
      <label className={styles.inputLabel}>
        Data de início:
        <input className={styles.inputField} type="text" name="dataInicio" onChange={(e) => setDataInicioInput(e.target.value)} value={ dataInicioInput }/>
      </label>
      <label className={styles.inputLabel}>
        Data de término:
        <input className={styles.inputField} type="text" name="dataTermino" onChange={(e) => setDataTerminoInput(e.target.value)} value={ dataTerminoInput }/>
      </label>
      <label className={styles.inputLabel}>
        Nome do operador transacionado:
        <input className={styles.inputField} type="text" name="nome" onChange={(e) => setNome(e.target.value)} value={ nome }/>
      </label>
    </form>

    <div className={styles.botaoContainer}>
      <button className={styles.botaoLimpar} onClick={() => { setDataInicioInput(""); setDataTerminoInput(""); setNome(""); }}>Limpar</button>
      <button className={styles.botaoPesquisar} onClick={() => { setDataInicio(dataInicioInput); setDataTermino(dataTerminoInput) }}>Pesquisar</button>
    </div>

    <div className={styles.tableContainer}>

      <div className={styles.saldoTextContainer}>
        <Saldo title='Saldo total'/>
        <Saldo title='Saldo no período' dataInicio={ dataInicio } dataTermino={ dataTermino }/>
      </div>
    
      <TabelaTransacoes dataInicio={dataInicio} dataTermino={dataTermino} nome={nome}/>
      
    </div>
  </div>
  )
}

export default App
