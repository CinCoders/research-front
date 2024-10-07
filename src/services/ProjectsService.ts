import { AxiosResponse } from 'axios';
import apiBack from './api';
import { ProjectsDTO, ProfessorProjects } from '../types/Projects.d';

export class ProjectsService {
  static async getProjects(
    year: boolean,
    professor: boolean,
    startYear: number,
    endYear: number,
  ): Promise<AxiosResponse<ProjectsDTO[]>> {
    const response = await apiBack.get(
      `projects?groupByProfessor=${professor}&groupByYear=${year}&startYear=${startYear}&endYear=${endYear}`,
      {
        validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
      },
    );
    return response;
  }

  static async getProfessorProjects(paramId: number): Promise<AxiosResponse<ProfessorProjects[]>> {
    const response = await apiBack.get(`/professors/${paramId}/projects`, {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
    });
    return response;
  }
}
