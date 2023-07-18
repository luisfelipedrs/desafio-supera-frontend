import React, { useEffect, useState } from 'react'


export interface SaldoProps {
    title: string,
    dataInicio?: string,
    dataTermino?: string
}

export default function Saldo({ title, dataInicio, dataTermino }: SaldoProps) {

    const [saldo, setSaldo] = useState(0);

      useEffect(() => {
        function fetchSaldo() {
            fetch(`http://localhost:8080/v1/transferencias/saldo?inicio=${ dataInicio ?? "" }&termino=${ dataTermino ?? "" }`)
              .then(res => res.json())
              .then(res => res as number)
              .then(res => setSaldo(res))
              .catch(error => {
                console.log(error)
              })
          }
          fetchSaldo()
      }, [dataInicio, dataTermino])
      
  return (
    <h2>{ title }: R$ { saldo } </h2>
  )
}
