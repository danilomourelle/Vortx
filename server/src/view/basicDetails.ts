import { Plan } from "../data/DataTable";

export default class BasicDetails {

  public generateResponse(toList: number[], fromList: number[], planList: Plan[]) {
    const planNamesList = planList.map(item => (
      item.name
    ))
    const fromSet = Array.from(new Set(fromList)).sort((a, b) => a - b)
    const toSet = Array.from(new Set(toList)).sort((a, b) => a - b)

    return {
      toList: fromSet,
      fromList: toSet,
      planList: planNamesList,
    }
  }
}