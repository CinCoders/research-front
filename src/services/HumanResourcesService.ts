import { AxiosResponse } from 'axios';
import { apiHr } from './api';
import { ProfessorHrResponse } from '../types/HRProfessor.d';

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
}
