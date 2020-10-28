export interface SimulationResponseData {
  from: number,
  to: number,
  callDuration: number,
  plan: string | number,
  withPlan: number,
  withoutPlan: number
}
export default class SimulationResponse {

  public generateResponse(response: SimulationResponseData | string, plan: string) {
    if (typeof response === 'string') {
      return { message: "Essa combinação de Origem e Destino não consta na tabela de Preço" }
    }
    else {

      return {
        ...response,
        plan
      }
    }
  }
}