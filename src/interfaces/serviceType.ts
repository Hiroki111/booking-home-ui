import { ServiceDto } from './service';

export interface ServiceTypeDto {
  id: number;
  name: string;
  services: ServiceDto[];
}
