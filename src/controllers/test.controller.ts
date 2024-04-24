import axios, { Axios, AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';


const testFunction = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res.send(result.data);
}

