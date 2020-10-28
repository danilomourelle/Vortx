import { Router } from "express";
import SimulationController from './controller/Simulation';

export const route = Router();

const simulation = new SimulationController()

route.get('/simulation', simulation.calculate)

