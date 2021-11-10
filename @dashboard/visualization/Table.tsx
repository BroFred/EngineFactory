import {
  Box, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import React from 'react';
import { useVirtual } from 'react-virtual';
import { useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';

export const config = () => null;

export const Edit = ({ dataAtoms }):JSX.Element => {
  const { enginePath } = useAtomValue(dataAtoms[0]);
  const dataRaw = useObservableState(enginePath, []);
  const data = dataRaw.length ? dataRaw : [[]];
  const parentRef = React.useRef();
  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    paddingStart: 41,
    estimateSize: React.useCallback(() => 53, []),
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <Box>
        <Table
          variant="striped"
        >
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody
            style={{
              width: '100%',
            }}
          >
            {rowVirtualizer.virtualItems.map((virtualRow) => (
              <Tr
                key={virtualRow.index}
                w="100%"
              >
                {data[virtualRow.index].map((virtualColumn, index) => (
                  <Td
                    outline="1px solid black"
                    key={index}
                    h="2rem"
                  >
                    {virtualColumn}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default Edit;
