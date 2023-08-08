import { AxiosResponse } from 'axios';
import { ProfessorStudents, Students } from '../types/Students.d';
import apiBack from './api';

export class StudentsService {
  static async getStudents(
    year: boolean,
    professor: boolean,
    currentStudents: boolean,
  ): Promise<AxiosResponse<Students[]>> {
    let filter = 'current';
    if (!currentStudents) {
      filter = 'concluded';
    }
    const response = await apiBack.get(
      `/post-graduation?groupByProfessor=${professor}&groupByYear=${year}&filter=${filter}`,
      {
        validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
      },
    );
    return response;
  }

  static async getProfessorStudents(
    paramId: number,
    currentStudents: boolean,
  ): Promise<AxiosResponse<ProfessorStudents[]>> {
    let filter = 'current';
    if (!currentStudents) {
      filter = 'concluded';
    }
    const response = await apiBack.get(`/professors/${paramId}/students?filter=${filter}`, {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
    });
    return response;
  }
}
