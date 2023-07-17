import { useEffect, useState } from 'react'
import './App.css'
import { ApiResponse, TransferenciaData } from './interface/transferenciaData'

function App() {

  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const [saldo, setSaldo] = useState(0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [nome, setNome] = useState("");
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0);

  function fetchData() {
    fetch(`http://localhost:8080/v1/transferencias?inicio=${ dataInicio }&termino=${ dataTermino }&nome=${ nome }&page=${ page }`)
      .then(res => res.json())
      .then(res => res as ApiResponse)
      .then(res => {
        setApiResponse(res)
        setTotalPages(res.totalPages)
      }) 
      .catch(error => {
        console.log(error)
      })
  }

  function fetchSaldo() {
    fetch(`http://localhost:8080/v1/transferencias/saldo?inicio=${ dataInicio }&termino=${ dataTermino }`)
      .then(res => res.json())
      .then(res => res as number)
      .then(res => setSaldo(res))
      .catch(error => {
        console.log(error)
      })
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    console.log(page)
    console.log(totalPages)
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
        <input type="text" name="dataInicio" onChange={(e) => setDataInicio(e.target.value)} value={ dataInicio }/>
      </label>
      <label>
        Data de término:
        <input type="text" name="dataTermino" onChange={(e) => setDataTermino(e.target.value)} value={ dataTermino }/>
      </label>
      <label>
        Nome do operador transacionado:
        <input type="text" name="nome" onChange={(e) => setNome(e.target.value)} value={ nome }/>
      </label>
    </form>

    <div className="botao-container">
      <button className="botao-pesquisar" onClick={() => fetchData()}>Pesquisar</button>
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
        <div className="botoes-paginas">
        <button onClick={() => handlePageChange(page - 1)} className="previous" disabled={ page === 0 }>&laquo;</button>
        <button onClick={() => handlePageChange(page + 1)} className="next" disabled={ page >= totalPages - 1 }>&raquo;</button>
      </div>
      }
      
    </div>
  </div>
  )
}

export default App
