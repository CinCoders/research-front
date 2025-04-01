import { AxiosResponse } from 'axios';
import { PatentsDTO, ProfessorPatents } from '../types/Patents.d';
import apiBack from './api';

export class PatentService {
  static async getPatents(year: boolean, professor: boolean): Promise<AxiosResponse<PatentsDTO[]>> {
    const response = await apiBack.get(`patents?groupByProfessor=${professor}&groupByYear=${year}`, {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
    });
    return response;
  }

  static async getProfessorPatents(id?: number, lattes?: string): Promise<AxiosResponse<ProfessorPatents[]>> {
    const response = await apiBack.get('professors/patents', {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
      params: {
        id,
        lattes,
      },
    });
    return response;
  }
}
