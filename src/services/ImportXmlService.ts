import { AxiosResponse } from 'axios';
import apiBack from './api';
import { ImportXmlDto, ImportXmlProps, Pagination } from '../types/Xml.d';

export class ImportXmlService {
  static async importXml(
    updateProgress: (progress: number) => void,
    importXml: ImportXmlProps,
  ): Promise<AxiosResponse> {
    const formData = new FormData();

    if (importXml.xmlFiles) {
      for (let i = 0; i < importXml.xmlFiles.length; i += 1) {
        formData.append(`file${i}`, importXml.xmlFiles[i]);
      }
    }

    const response = await apiBack.post('import-xml', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      validateStatus: (status: number) => [201, 500].includes(status),
      onUploadProgress: progressEvent => {
        const progress: number = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        updateProgress(progress);
      },
    });
    return response;
  }

  static async findAllImportedXmls(
    limit: number,
    page: number,
    offset?: number,
  ): Promise<AxiosResponse<Pagination<ImportXmlDto[]>>> {
    const response = await apiBack.get<Pagination<ImportXmlDto[]>>('import-xml', {
      validateStatus: status => [200].includes(status),
      params: { limit, page, offset },
    });
    return response;
  }

  static async reprocessXML(id: string): Promise<AxiosResponse> {
    const response = await apiBack.get(`import-xml/${id}/reprocess`, {
      validateStatus: (status: number) => [200].includes(status),
    });
    return response;
  }
}
