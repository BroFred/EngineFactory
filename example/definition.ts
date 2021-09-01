import { BehaviorSubject } from 'rxjs';

export interface baseDefinitionItem {
  enginePath: string;
  options: Record<string, unknown>;
  id?: string;
}
export interface baseDefinitionProps extends Omit<baseDefinitionItem, 'enginePath'> {
  enginePath: BehaviorSubject<any[]>
}
export interface variablesItem {
  id: string;
  value?: string[];
}
