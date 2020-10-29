import { Router } from "express";
import SimulationController from './controller/Simulation';

export const route = Router();

const simulation = new SimulationController()

route.post('/simulation', simulation.calculate)
route.get('/basic-details', simulation.basicDetails)
