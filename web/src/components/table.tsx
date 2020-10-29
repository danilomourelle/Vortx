import React from 'react';

import '../styles/components/resultTable.css'

interface ResultTableProps {
  results: {
    from: number,
    to: number,
    callDuration: number,
    plan: string,
    withPlan: number,
    withoutPlan: number
  }
}

export default function ResultTable(props: ResultTableProps) {
  const { from, to, callDuration, plan, withPlan, withoutPlan } = props.results
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  return (
    <table id="results">
      <tr>
        <th>Origem</th>
        <th>Destino</th>
        <th>Tempo</th>
        <th>Plano FaleMais</th>
        <th>Com FaleMais</th>
        <th>Sem FaleMais</th>
      </tr>
      <tr>
        <td>{from}</td>
        <td>{to}</td>
        <td>{callDuration}</td>
        <td>{plan}</td>
        <td>{formatter.format(withPlan)}</td>
        <td>{formatter.format(withoutPlan)}</td>
      </tr>
    </table>
  )
}