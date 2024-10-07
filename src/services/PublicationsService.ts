import { AxiosResponse } from 'axios';
import { ProfessorPublications, PublicationsDTO } from '../types/Publications.d';
import apiBack from './api';

export class PublicationsService {
  static async getProfessorPublications(
    paramId: string,
    articles: boolean,
    conferences: boolean,
  ): Promise<AxiosResponse<ProfessorPublications[]>> {
    const response = await apiBack.get(
      `/professors/${paramId}/publications?journalPublications=${articles}&conferencePublications=${conferences}`,
      {
        validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
      },
    );
    return response;
  }

  static async getPublications(
    year: boolean,
    professor: boolean,
    articles: boolean,
    conferences: boolean,
    startYear: number,
    endYear: number,
  ): Promise<AxiosResponse<PublicationsDTO[]>> {
    const response = await apiBack.get(
      `/publications?groupByYear=${year}&groupByProfessor=${professor}&articles=${articles}` +
        `&conferences=${conferences}&startYear=${startYear}&endYear=${endYear}`,
      {
        validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
      },
    );
    return response;
  }
}
