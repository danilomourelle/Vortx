import PriceTable from "../data/DataTable";
import { SimulationResponseData } from "../view/resultTable";


export default class SimulationService {

  constructor(private priceTable: PriceTable) { }

  public calculate(data: { from: number, to: number, callDuration: number, plan: number }): string | SimulationResponseData {
    const { from, to, callDuration, plan } = data

    const values = this.priceTable.getPrice(from, to)

    if (values) {
      let withPlan: number = 0
      if (callDuration > plan) {
        withPlan = ((callDuration - plan) * values.price * 1.1)
      }

      const withoutPlan = callDuration * values.price

      return {
        from,
        to,
        callDuration,
        plan,
        withPlan,
        withoutPlan
      }
    } else {
      return "Essa combinação de Origem e Destino não consta na tabela de Preço"
    }
  }
}

