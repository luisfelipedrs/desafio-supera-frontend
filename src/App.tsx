import { useEffect, useState } from 'react'
import './App.css'
import { ApiResponse, TransferenciaData } from './interface/transferenciaData'

function App() {

  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const [saldo, setSaldo] = useState(0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);
  const [dataInicio, setdataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [nome, setNome] = useState("");
  const [page, setPage] = useState(0)

  function fetchData() {
    fetch(`http://localhost:8080/v1/transferencias?inicio=${ dataInicio }&termino=${ dataTermino }&nome=${ nome }&page=${ page }`)
      .then(res => res.json())
      .then(res => res as ApiResponse)
      .then(res => setApiResponse(res))
      .catch(error => {
        console.log("deu ruim")
      })
  }

  function fetchSaldo() {
    fetch(`http://localhost:8080/v1/transferencias/saldo?inicio=${ dataInicio }&termino=${ dataTermino }`)
      .then(res => res.json())
      .then(res => res as number)
      .then(res => setSaldo(res))
      .catch(error => {
        console.log("deu ruim")
      })
  }

  useEffect(() => {
     fetchData();
     fetchSaldo();
  }, [page])

  return (
  <div className="container">

    <form className="dados-pesquisa-form">
      <label>
        Data de início:
        <input type="text" name="dataInicio" />
      </label>
      <label>
        Data de término:
        <input type="text" name="dataTermino" />
      </label>
      <label>
        Nome do operador transacionado:
        <input type="text" name="nome" />
      </label>
    </form>

    <div className="botao-container">
      <input className="botao-pesquisar" type="submit" value="Pesquisar"/>
    </div>

    <div className="table-container">

      <div className="saldo-text-container">
        <h2>Saldo total: R$ { saldo } </h2>
        <h2>Saldo no período: R$ { saldoPeriodo } </h2>
      </div>
    
      <table className="tabela-informacoes">
        <thead>
          <tr>
            <th>Dados</th>
            <th>Valência</th>
            <th>Tipo</th>
            <th>Nome do operador transicionado</th>
          </tr>
        </thead>
        <tbody>
          { 
          apiResponse?.content.map(item => 
            <tr key={ item.id }> 
            <td>{ item.dataTransferencia }</td>
            <td>{ item.valor }</td>
            <td>{ item.tipo }</td>
            <td>{ item.nomeOperadorTransacao }</td>
          </tr>)
          }
        </tbody>
      </table>
      {
        apiResponse && 
        <div className="botoes-paginas">
        <button onClick={() => setPage(page - 1)} className="previous" disabled={ page === 0 }>&laquo;</button>
        <button onClick={() => setPage(page + 1)} className="next" disabled={ page === apiResponse?.pageable.totalPages - 1 }>&raquo;</button>
      </div>
      }
      
    </div>
  </div>
  )
}

export default App
