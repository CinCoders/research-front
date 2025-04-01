import { AxiosResponse } from 'axios';
import { ProfessorStudents, Students } from '../types/Students.d';
import apiBack from './api';

export class StudentsService {
  static async getStudents(
    year: boolean,
    professor: boolean,
    currentStudents: boolean,
    startYear: number,
    endYear: number,
  ): Promise<AxiosResponse<Students[]>> {
    let filter = 'current';
    if (!currentStudents) {
      filter = 'concluded';
    }
    const response = await apiBack.get(
      `/post-graduation?groupByProfessor=${professor}&groupByYear=${year}&filter=${filter}` +
        `&startYear=${startYear}&endYear=${endYear}`,
      {
        validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
      },
    );
    return response;
  }

  static async getProfessorStudents(
    currentStudents: boolean,
    id?: number,
    lattes?: string,
  ): Promise<AxiosResponse<ProfessorStudents[]>> {
    let filter = 'current';
    if (!currentStudents) {
      filter = 'concluded';
    }
    const response = await apiBack.get('/professors/students', {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
      params: {
        id,
        lattes,
        filter,
      },
    });
    return response;
  }
}
