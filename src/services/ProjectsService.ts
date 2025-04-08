import { AxiosResponse } from 'axios';
import { ProfessorProjects, ProjectsDTO } from '../types/Projects.d';
import apiBack from './api';

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

  static async getProfessorProjects(id?: number, lattes?: string): Promise<AxiosResponse<ProfessorProjects[]>> {
    const response = await apiBack.get('/professors/projects', {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
      params: {
        id,
        lattes,
      },
    });
    return response;
  }
}
