import { Service } from './service';

export interface ServiceType {
  id: number;
  name: string;
  services: Service[];
}
