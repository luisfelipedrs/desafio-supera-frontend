import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';


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
    
    <p className={styles.text}>{ title }: <NumericFormat value={ saldo.toFixed(2) } displayType='text' thousandSeparator={true} prefix={'R$ '}/></p>
  )
}
