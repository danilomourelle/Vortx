import { Request, Response } from "express";
import * as Yup from 'yup';
import PriceTable from "../data/PriceTable";
import SimulationService from "../service/Simulations";
import SimulationResponse from "../view/resultTable";

export default class SimulationController {
  private static PriceTableData = new PriceTable()
  private static SimulationResponse = new SimulationResponse()
  private static SimulationService = new SimulationService(
    new PriceTable()
  )

  async calculate(req: Request, res: Response) {
    try {
      const data = {
        from: Number(req.query.from),
        to: Number(req.query.to),
        callDuration: Number(req.query.callDuration),
        plan: req.query.plan as string
      }

      const { fromList, toList } = SimulationController.PriceTableData.getFromToList()
      const planList = SimulationController.PriceTableData.getPlanList()

      const schema = Yup.object().shape({
        from: Yup.number().required().oneOf(fromList, "Esse DDD não está na lista de Origem"),
        to: Yup.number().required().oneOf(toList, "Esse DDD não está na lista de Destino"),
        callDuration: Yup.number().required().min(0, "A duração da chamada deve ser maior ou igual a 0"),
        plan: Yup.string().required().oneOf(planList.map(plan => plan.name), "Esse plano não está na lista fornecida"),
      })
      await schema.validate(data, {
        abortEarly: false
      })

      const planFound = planList.find(item => item.name === data.plan)

      const response = SimulationController.SimulationService.calculate({ ...data, plan: planFound.value })

      res.status(200).send(SimulationController.SimulationResponse.generateResponse(response, planFound.name))


    } catch (error) {
      console.error(error)
      res.status(400).send(error)
    }
  }
};


