import { AxiosResponse } from 'axios';
import apiBack from './api';
import { PatentsDTO, ProfessorPatents } from '../types/Patents.d';

export class PatentService {
  static async getPatents(year: boolean, professor: boolean): Promise<AxiosResponse<PatentsDTO[]>> {
    const response = await apiBack.get(`patents?groupByProfessor=${professor}&groupByYear=${year}`, {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
    });
    return response;
  }

  static async getProfessorPatents(id: number): Promise<AxiosResponse<ProfessorPatents[]>> {
    const response = await apiBack.get(`professors/${id}/patents`, {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
    });
    return response;
  }
}
