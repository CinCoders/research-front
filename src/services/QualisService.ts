import { AxiosResponse } from 'axios';
import { ConferencesQualis, JournalQualis, QualisTypeDTO } from '../types/Qualis.d';
import apiBack from './api';

export class QualisService {
  static async getPublicationsQualis(
    checkedConferences: boolean,
  ): Promise<AxiosResponse<ConferencesQualis[] | JournalQualis[]>> {
    if (checkedConferences) {
      return this.getConferencesQualis();
    }
    return this.getJournalQualis();
  }

  static async getConferencesQualis(): Promise<AxiosResponse<ConferencesQualis[]>> {
    const response = await apiBack.get('qualis/conferences', {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
    });

    return response;
  }

  static async getJournalQualis(): Promise<AxiosResponse<JournalQualis[]>> {
    const response = await apiBack.get('qualis/journals', {
      validateStatus: (status: number) => [200, 401, 403, 404, 500].includes(status),
    });

    return response;
  }

  static async updateConferenceQualis(
    conferenceQualis: ConferencesQualis,
  ): Promise<AxiosResponse<ConferencesQualis[]>> {
    const response = await apiBack.patch(`qualis/conferences/${conferenceQualis.id}`, conferenceQualis, {
      validateStatus: (status: number) => [200, 201, 401, 403, 404, 500].includes(status),
    });
    return response;
  }

  static async updateJournalQualis(journalQualis: JournalQualis): Promise<AxiosResponse<JournalQualis[]>> {
    const response = await apiBack.patch(`qualis/journals/${journalQualis.id}`, journalQualis, {
      validateStatus: (status: number) => [200, 201, 401, 403, 404, 500].includes(status),
    });
    return response;
  }

  static async createConferenceQualis(conferenceQualis: QualisTypeDTO): Promise<AxiosResponse<ConferencesQualis[]>> {
    const conferenceQualisDTO = conferenceQualis;
    delete conferenceQualisDTO.issn;
    const response = await apiBack.post('qualis/conferences/', conferenceQualisDTO);

    return response;
  }

  static async createJournalQualis(journalQualis: QualisTypeDTO): Promise<AxiosResponse<JournalQualis[]>> {
    const journalQualisDTO = journalQualis;
    delete journalQualisDTO.acronym;
    const response = await apiBack.post('qualis/journals/', journalQualisDTO);
    return response;
  }
}
