import SimulationController from '../../src/controller/Simulation';

describe("Testing SimulationController calculate ", () => {
  const simulationController = new SimulationController()

  test("Should return error for empty from", async () => {
    const mockReq: any = {
      body: {
        from: "",
        to: 11,
        callDuration: 25,
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  test("Should return error for from not in fromList", async () => {
    const mockReq: any = {
      body: {
        from: 10,
        to: 11,
        callDuration: 25,
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  test("Should return error for from not a number", async () => {
    const mockReq: any = {
      body: {
        from: "aa11",
        to: 11,
        callDuration: 25,
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })

  test("Should return error for empty to", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: "",
        callDuration: 25,
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  test("Should return error for to not in toList", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: 10,
        callDuration: 25,
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  test("Should return error for to not a number", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: "aaa11",
        callDuration: 25,
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })

  test("Should return error for empty plan", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: 11,
        callDuration: 25,
        plan: ""
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  test("Should return error for plan not in planList", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: 11,
        callDuration: 25,
        plan: "FaleMais 90"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  test("Should return error for plan not a string", async () => {
    const mockReq: any = {
      body: {
        from: "11",
        to: 11,
        callDuration: 25,
        plan: {plan: "FaleMais 30"}
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })

  test("Should return error for empty callDuration", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: 11,
        callDuration: "",
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  test("Should return error for callDuration less than 0", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: 11,
        callDuration: -25,
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
  test("Should return error for callDuration not a number", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: 11,
        callDuration: "aaa25",
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
  })

  test("Should return message for valid input but without combination", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: 11,
        callDuration: 25,
        plan: "FaleMais 30"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Essa combinação de Origem e Destino não consta na tabela de Preço"})
  })
  test("Should return calculated values for valid input and existing combination", async () => {
    const mockReq: any = {
      body: {
        from: 11,
        to: 17,
        callDuration: 80,
        plan: "FaleMais 60"
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await simulationController.calculate(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.send).toHaveBeenCalledWith({
      result: {
        from: 11,
        to: 17,
        callDuration: 80,
        plan: "FaleMais 60",
        withPlan: 37.4,
        withoutPlan: 136
      } 
    })
  })
})

describe("Testing SimulationController basicDetails", () => {
  const simulationController = new SimulationController()

  test("Should return fromList and toList equal to DataTable.ts file", () => {
    const mockReq: any = { }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    simulationController.basicDetails(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.send).toHaveBeenCalledWith({
      toList: [11, 16, 17, 18],
      fromList: [11, 16, 17, 18],
      planList: ["FaleMais 30", "FaleMais 60", "FaleMais 120"],
    })
  })
})