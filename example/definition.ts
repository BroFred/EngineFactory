import { BehaviorSubject } from 'rxjs';

export interface baseDefinitionItem {
  enginePath: string;
  options: {
    [key:string] : any;
    dataSource: string[];
    variables: string[];
  };
  id: string;
}
export interface baseDefinitionProps extends Omit<baseDefinitionItem, 'enginePath'> {
  enginePath: BehaviorSubject<any[]>
}

export interface variablesItem {
  id: string;
  value?: string[];
}
