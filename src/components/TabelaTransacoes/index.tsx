import React, { useEffect, useState } from 'react'
import { ApiResponse, TransferenciaData } from '../../interface/transferenciaData'

export interface TabelaTransacoesProps {
    dataInicio: string,
    dataTermino: string,
    nome: string
}

export default function TabelaTransacoes({ dataInicio, dataTermino, nome }: TabelaTransacoesProps) {

  const [page, setPage] = useState(0)
  const [apiResponse, setApiResponse] = useState<ApiResponse>();

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    function fetchData() {
     fetch(`http://localhost:8080/v1/transferencias?inicio=${ dataInicio }&termino=${ dataTermino }&nome=${ nome }&page=${ page }`)
       .then(res => res.json())
       .then(res => res as ApiResponse)
       .then(res => {
         setApiResponse(res)
       }) 
       .catch(error => {
         console.log(error)
       })
   }
   fetchData();
 }, [page, dataInicio, dataTermino, nome])

  return (
    apiResponse && 
    <>
    <table className="tabela-transacoes">
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
    <div className="botoes-paginas">
        <button onClick={() => handlePageChange(page - 1)} className="previous" disabled={ page === 0 }>&laquo;</button>
        <button onClick={() => handlePageChange(page + 1)} className="next" disabled={ page >= apiResponse?.totalPages - 1 }>&raquo;</button>
      </div>
    </>
  )
}
