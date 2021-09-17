import { renderHook, act } from '@testing-library/react-hooks';
import { atom } from 'jotai';
import { of } from 'rxjs';
import useDataSources from './useDataSources';

const dataSource = atom({
  enginePath: of(1),
});

test('deep', () => {
  const { result } = renderHook(() => useDataSources([dataSource]));

  expect(result.current[0]).toBe(1);
});
