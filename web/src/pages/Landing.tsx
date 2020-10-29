import React, { FormEvent, useEffect, useState } from 'react';
import ResultTable from '../components/table';
import api from '../services/api';


import '../styles/pages/landing.css';

interface BasicDetailsList {
  fromList: number[],
  toList: number[],
  planList: string[],
}

export interface SimulationResponse {
  result?: {
    from: number,
    to: number,
    callDuration: number,
    plan: string,
    withPlan: number,
    withoutPlan: number
  }
  message?: string
}

function Landing() {
  const [basicDetails, setBasicDetails] = useState<BasicDetailsList>({ fromList: [], toList: [], planList: [] });
  const [simulationResponse, setSimulationResponse] = useState<SimulationResponse>()
  const [callDuration, setCallDuration] = useState<number>(0)
  const [fromChecked, setFromChecked] = useState<number>()
  const [toChecked, setToChecked] = useState<number>()
  const [planChecked, setPlanChecked] = useState<string>()


  useEffect(() => {
    api
      .get<BasicDetailsList>('/basic-details')
      .then(res => {
        setBasicDetails(res.data)
        setFromChecked(res.data.fromList[0])
        setToChecked(res.data.toList[0])
        setPlanChecked(res.data.planList[0])
      })
      .catch(error => {
        console.error(error)
      })
  }, [setBasicDetails])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    api
      .post<SimulationResponse>('/simulation', {
        from: fromChecked,
        to: toChecked,
        plan: planChecked,
        callDuration
      })
      .then(res => {
        setSimulationResponse(res.data)
      })
      .catch(error => {
        setSimulationResponse({ message: "Houve um erro interno" })
      })

  }

  // TODO:  e input response
  return (
    <div id="page-wrapper">
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-label-block">
          <p className="input-label" >Origem: </p>
          <div className="input-radio-block">
            {
              basicDetails.fromList.map(item => (
                <div key={item} className="input-radio">
                  <input
                    type="radio"
                    id={String(item)}
                    name="from"
                    value={item}
                    checked={fromChecked === item}
                    onChange={(event) => setFromChecked(Number(event.target.value))}
                  />
                  <label htmlFor={String(item)}>{item}</label>
                </div>
              ))
            }
          </div>
        </div>

        <div className="input-label-block">
          <p className="input-label" >Destino: </p>
          <div className="input-radio-block">
            {
              basicDetails.toList.map(item => (
                <div key={item} className="input-radio">
                  <input
                    type="radio"
                    id={String(item)}
                    name="to"
                    value={item}
                    checked={toChecked === item}
                    onChange={(event) => setToChecked(Number(event.target.value))}
                  />
                  <label htmlFor={String(item)}>{item}</label>
                </div>
              ))
            }
          </div>
        </div>

        <div className="input-label-block">
          <p className="input-label" >Plano: </p>
          <div className="input-radio-block">
            {
              basicDetails.planList.map(item => (
                <div key={item} className="input-radio">
                  <input
                    type="radio"
                    id={String(item)}
                    name="plan"
                    value={item}
                    checked={planChecked === item}
                    onChange={(event) => setPlanChecked(event.target.value)}
                  />
                  <label htmlFor={String(item)}>{item}</label>
                </div>
              ))
            }
          </div>
        </div>

        <div className="input-label-block">
          <p className="input-label">Duração da ligação</p>
          <input
            type="number"
            name="duração"
            placeholder="Tempo em minutos"
            className="input-number"
            min={0}
            value={callDuration}
            onChange={(event) => setCallDuration(Number(event.target.value))}
          />
        </div>
        <button type="submit" >Simular</button>
      </form>

      {
        simulationResponse &&
        <div className="result-wrapper">
          {
            simulationResponse.message && <p>{simulationResponse.message}</p>
          }
          {
            simulationResponse.result && <ResultTable results={simulationResponse.result} />
          }
        </div>
      }

    </div >
  );
}

export default Landing