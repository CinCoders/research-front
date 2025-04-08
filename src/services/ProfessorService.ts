import { AxiosResponse } from 'axios';
import { Professor, ProfessorDetails } from '../types/Professor.d';
import apiBack from './api';

export class ProfessorService {
  static async getProfessor(id?: number, lattes?: string): Promise<AxiosResponse<Professor>> {
    const response = await apiBack.get('/professors/find', {
      validateStatus: (status: number) => [200, 401, 403, 404].includes(status),
      params: {
        id,
        lattes,
      },
    });
    return response;
  }

  static async getProfessors(): Promise<AxiosResponse<ProfessorDetails[]>> {
    const response = await apiBack.get('/professors');
    return response;
  }

  static async deleteProfessor(id: number): Promise<AxiosResponse<Professor>> {
    const response = await apiBack.delete(`/professors/${id}`, {
      validateStatus: (status: number) => [200, 401, 403, 404].includes(status),
    });
    return response;
  }
}
