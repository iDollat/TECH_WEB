import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.get(`${this.path}/:id/latest`, this.getLatestReadings);
        this.router.get(`${this.path}/:id`, this.getReading);
        this.router.get(`${this.path}/:id/:num`, this.getReadingRange);
        this.router.delete(`${this.path}/all`, this.deleteArray);
        this.router.delete(`${this.path}/:id`, this.deleteSelected);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;
        const { id } = request.params;
        testArr.push(Number(id));
        response.status(200).json(id);
    };

    private getLatestReadings = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const max = testArr.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
        response.status(200).json(max);
    };

    private getReading = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        response.status(200).json(testArr[Number(id)]);
    }

    private getReadingRange = async (request: Request, response: Response, next: NextFunction) => {
        const { id, num } = request.params;

        const array = testArr.slice(Number(id),Number(id)+Number(num));
        response.status(200).json(array);
    }

    private deleteArray = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        response.status(200).json(testArr);
    };

    private deleteSelected = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        testArr[Number(id)] = 0;
        response.status(200).json(testArr[Number(id)]);
    };
 }
 
 export default DataController;
 