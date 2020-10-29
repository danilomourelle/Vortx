import { Request, Response } from "express";
import * as Yup from 'yup';
import PriceTable from "../data/DataTable";
import SimulationService from "../service/Simulations";
import BasicDetails from "../view/basicDetails";
import SimulationResponse from "../view/resultTable";

export default class SimulationController {
  private static PriceTableData = new PriceTable()
  private static SimulationResponse = new SimulationResponse()
  private static BasicDetails = new BasicDetails()
  private static SimulationService = new SimulationService(
    new PriceTable()
  )

  basicDetails(req: Request, res: Response) {
    try {
      const { fromList, toList } = SimulationController.PriceTableData.getFromToList()
      const planList = SimulationController.PriceTableData.getPlanList()

      res.status(200).send(SimulationController.BasicDetails.generateResponse(toList, fromList, planList))

    } catch (error) {
      res.send(500).send({ message: 'Internal Server Error' })
    }
  }

  async calculate(req: Request, res: Response) {
    try {

      const { fromList, toList } = SimulationController.PriceTableData.getFromToList()
      const planList = SimulationController.PriceTableData.getPlanList()

      const schema = Yup.object().shape({
        from: Yup.number().required().oneOf(fromList, "Esse DDD não está na lista de Origem"),
        to: Yup.number().required().oneOf(toList, "Esse DDD não está na lista de Destino"),
        callDuration: Yup.number().required().min(0, "A duração da chamada deve ser maior ou igual a 0"),
        plan: Yup.string().required().oneOf(planList.map(plan => plan.name), "Esse plano não está na lista fornecida"),
      })
      await schema.validate(req.body, {
        abortEarly: false
      })

      const planFound = planList.find(item => item.name === req.body.plan)

      const response = SimulationController.SimulationService.calculate({ ...req.body, plan: planFound!.value })

      res.status(200).send(SimulationController.SimulationResponse.generateResponse(response, planFound!.name))


    } catch (error) {
      console.error(error)
      res.status(400).send(error)
    }
  }
};


