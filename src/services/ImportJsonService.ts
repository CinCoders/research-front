import { AxiosResponse } from 'axios';
import apiBack from './api';
import { ImportJsonDto, ImportJsonProps, Pagination } from '../types/Json.d';

export class ImportJsonService {
  static async importJson(
    updateProgress: (progress: number) => void,
    importJson: ImportJsonProps,
  ): Promise<AxiosResponse> {
    const formData = new FormData();

    if (importJson.jsonFile) {    
        formData.append(`file`, importJson.jsonFile);
    }

    const response = await apiBack.post('import-json', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      validateStatus: (status: number) => [201, 406, 500].includes(status),
      onUploadProgress: progressEvent => {
        const progress: number = progressEvent?.total
          ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
          : 0;
        updateProgress(progress);
      },
    });
    return response;
  }

  static async findAllJsons(
    limit: number,
    page: number,
    offset?: number,
  ): Promise<AxiosResponse<Pagination<ImportJsonDto[]>>> {
    const response = await apiBack.get<Pagination<ImportJsonDto[]>>('import-json', {
      validateStatus: status => [200].includes(status),
      params: { limit, page, offset },
    });
    return response;
  }

  static async reprocessJson(id: string): Promise<AxiosResponse> {
    const response = await apiBack.get(`import-json/${id}/reprocess`, {
      validateStatus: (status: number) => [200].includes(status),
    });
    return response;
  }
}
