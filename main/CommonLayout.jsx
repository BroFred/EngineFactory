import React from 'react';
const LayoutCommon = ({enginePath, options, children, ...rest}) => {
    const Layout = React.lazy(async () => await import(`@dashboard/layout/${enginePath}`));
    return <Layout options={options} {...rest}>
        {children}
    </Layout>
}

export default LayoutCommon;