import './App.css'

function App() {

  const operacoes = [
    {
      data: "14/02/2019",
      valor: "30000",
      tipo: "Deposito",
      nomeOperador: "Luis Felipe"
    },
    {
      data: "14/02/2019",
      valor: "30000",
      tipo: "Deposito",
      nomeOperador: "Luis Felipe"
    },
    {
      data: "14/02/2019",
      valor: "30000",
      tipo: "Deposito",
      nomeOperador: "Luis Felipe"
    },
    {
      data: "14/02/2019",
      valor: "30000",
      tipo: "Deposito",
      nomeOperador: "Luis Felipe"
    }
  ]

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
        <h2>Saldo total: R$ 50,00 </h2>
        <h2>Saldo no período: R$ 50,00 </h2>
      </div>
    
      <table className="tabela-informacoes">
        <tr>
          <th>Dados</th>
          <th>Valência</th>
          <th>Tipo</th>
          <th>Nome do operador transicionado</th>
        </tr>
        { 
        operacoes.map((item, index) => 
        <tr key={ index }> 
          <td>{ item.data }</td>
          <td>{ item.valor }</td>
          <td>{ item.tipo }</td>
          <td>{ item.nomeOperador }</td>
      </tr>)
        }
        
      </table>
      <div className="botoes-paginas">
        <a href="#" className="previous">&laquo; Previous</a>
        <a href="#" className="next">Next &raquo;</a>

        <a href="#" className="previous round">&#8249;</a>
        <a href="#" className="next round">&#8250;</a>
      </div>
    </div>

  </div>
  )
}

export default App
