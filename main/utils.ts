import { baseDefinitionItem } from '@example/definition';
import { dropWhile } from 'ramda';

export const removeItem = (idx:string, items:baseDefinitionItem[])
:baseDefinitionItem[] => dropWhile(({ id }) => id === idx, items);
export const addItem = ({ id, options, enginePath }:baseDefinitionItem,
  items:baseDefinitionItem[])
:baseDefinitionItem[] => [{ id, options, enginePath }, ...items];
