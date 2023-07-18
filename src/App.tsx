import { useEffect, useState } from 'react'
import './App.css'
import { ApiResponse, TransferenciaData } from './interface/transferenciaData'
import Saldo from './components/Saldo/Saldo';
import TabelaTransacoes from './components/TabelaTransacoes';

function App() {

  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [nome, setNome] = useState("");
  const [dataInicioInput, setDataInicioInput] = useState("");
  const [dataTerminoInput, setDataTerminoInput] = useState("");

  return (
  <div className="container">

    <form className="dados-pesquisa-form">
      <label>
        Data de início:
        <input type="text" name="dataInicio" onChange={(e) => setDataInicioInput(e.target.value)} value={ dataInicioInput }/>
      </label>
      <label>
        Data de término:
        <input type="text" name="dataTermino" onChange={(e) => setDataTerminoInput(e.target.value)} value={ dataTerminoInput }/>
      </label>
      <label>
        Nome do operador transacionado:
        <input type="text" name="nome" onChange={(e) => setNome(e.target.value)} value={ nome }/>
      </label>
    </form>

    <div className="botao-container">
      <button className="botao-pesquisar" onClick={() => { setDataInicio(dataInicioInput); setDataTermino(dataTerminoInput) }}>Pesquisar</button>
    </div>

    <div className="table-container">

      <div className="saldo-text-container">
        <Saldo title='Saldo total'/>
        <Saldo title='Saldo no período' dataInicio={ dataInicio } dataTermino={ dataTermino }/>
      </div>
    
      <TabelaTransacoes dataInicio={dataInicio} dataTermino={dataTermino} nome={nome}/>
      
    </div>
  </div>
  )
}

export default App
