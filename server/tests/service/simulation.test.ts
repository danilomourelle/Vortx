import PriceTable from '../../src/data/DataTable';
import SimulationService from '../../src/service/Simulations';

describe("Testing SimulationService calculate", () => {
  const service = new SimulationService(new PriceTable())

  test("Should return message for valid input but without combination", async () => {
    const mockData: any = {
      from: 11,
      to: 11,
      callDuration: 25,
      plan: 30
    }

    const response = service.calculate(mockData)

    expect(response).toEqual("Essa combinação de Origem e Destino não consta na tabela de Preço")
  })
  test("Should return calculated values for valid input and existing combination", async () => {
    const mockData: any = {
      from: 11,
      to: 17,
      callDuration: 80,
      plan: 60
    }

    const response = service.calculate(mockData)

    expect(response).toEqual({
      from: 11,
      to: 17,
      callDuration: 80,
      plan: 60,
      withPlan: 37.4,
      withoutPlan: 136
    })
  })
})