import { Box } from '@chakra-ui/react';
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
  });

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: data[0].length,
    parentRef,
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
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: `${columnVirtualizer.totalSize}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <React.Fragment key={virtualRow.index}>
            {columnVirtualizer.virtualItems.map((virtualColumn) => (
              <Box
                key={virtualColumn.index}
                ref={(el) => {
                  virtualRow.measureRef(el);
                  virtualColumn.measureRef(el);
                }}
                position="absolute"
                top="0"
                left="0"
                w="7rem"
                h="2rem"
                transform={`translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`}
              >
                Cell
                {' '}
                {virtualRow.index}
                ,
                {' '}
                {virtualColumn.index}
              </Box>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Edit;
