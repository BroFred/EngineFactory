import React, { memo, useEffect, useMemo } from 'react';

const LayoutCommon = ({
  enginePath, options, children, ...rest
}) => {
  useEffect(() => () => console.log('unmount layout'), []);
  const Layout = useMemo(() => React.lazy(async () => import(`@dashboard/layout/${enginePath}`)), [enginePath]);
  return (
    <Layout options={options} {...rest}>
      {children}
    </Layout>
  );
};

export default memo(LayoutCommon);
