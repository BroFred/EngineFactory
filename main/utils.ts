import { baseDefinitionItem } from '@example/definition';
import { dropWhile, startsWith } from 'ramda';

export const removeItem = (idx:string, items:baseDefinitionItem[])
:baseDefinitionItem[] => dropWhile(({ id }) => id === idx, items);
export const addItem = ({ id, options, enginePath }:baseDefinitionItem,
  items:baseDefinitionItem[])
:baseDefinitionItem[] => [{ id, options, enginePath }, ...items];

export const isRemoteHost = (enginePath: string) => startsWith('@remote', enginePath);
