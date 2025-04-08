import { AxiosResponse } from 'axios';
import { ProfessorHrResponse } from '../types/HRProfessor.d';
import { apiHr } from './api';

export default class HumanResourcesService {
  static async getProfessors(lattesCode?: string | undefined): Promise<AxiosResponse<ProfessorHrResponse[]>> {
    if (apiHr) {
      const response = await apiHr.get('/employee', {
        params: { lattesCode },
        validateStatus: status => [200].includes(status),
      });
      return response;
    }
    throw new Error('Não conectado com a API');
  }

  static async getProfessorByAlias(alias: string): Promise<AxiosResponse<ProfessorHrResponse[]>> {
    if (apiHr) {
      const response = await apiHr.get<ProfessorHrResponse[]>('/employee', {
        validateStatus: status => [200].includes(status),
        params: { alias },
      });

      return response;
    }

    throw new Error('Não conectado com a API');
  }
}
