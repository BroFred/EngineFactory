import React, { Suspense, useEffect } from 'react';
import { map } from 'ramda';
import { Provider, atom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { baseDefinitionItem } from '@example/definition';
import Show from '@example/showDefinition';
import { definitionAtom } from 'Platform/state';
import { ChakraProvider, extendTheme, Button } from '@chakra-ui/react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import def from '../example/example1.json';
import Ds from './CommonDataSource';
import Viz from './CommonVisualization';
import Layout from './CommonLayout';

const AddMetaData = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const setUserMetadata = async () => {
    const domain = 'dev-i7q374rd.us.auth0.com';

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: 'update:current_user_metadata',
      });

      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      const options = {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
        body: JSON.stringify({ user_metadata: { addresses: { home: '123 Main Street, Anytown, ST 12345' } } }),
      };
      const metadataResponse = await fetch(userDetailsByIdUrl, options);

      // const { user_metadata } = await metadataResponse.json();

      // console.log(user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Button onClick={setUserMetadata}>
      set meta
    </Button>
  );
};
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

const Profile = () => {
  const elem = useAuth0();

  const {
    user, isAuthenticated, isLoading, getAccessTokenSilently,
  } = elem;
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'dev-i7q374rd.us.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        console.log(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};
const defAtom = atom(def);

const DataSources = () => {
  const { dataSource }:
  {
    visualization: baseDefinitionItem[],
    layout: baseDefinitionItem,
    dataSource: baseDefinitionItem[] } = useAtomValue(defAtom);
  return (
    <>
      {
            map(
              (ds) => (
                <Suspense key={ds.id} fallback={<></>}>
                  <Ds key={ds.id} {...ds} />
                </Suspense>
              ), dataSource,
            )
        }
    </>
  );
};

const Visualization = () => {
  const { layout, visualization }:
  {
    visualization: baseDefinitionItem[],
    layout: baseDefinitionItem,
    dataSource: baseDefinitionItem[] } = useAtomValue(defAtom);
  return (
    <Suspense fallback={<></>}>
      <Layout {...layout}>
        {
                map(
                  (vis) => (
                    <Suspense key={vis.id} fallback={<></>}>
                      <Viz {...vis} />
                    </Suspense>
                  ), visualization,
                )
            }
      </Layout>
    </Suspense>
  );
};

const App: React.FC<{}> = () => {
  const { visualization, layout, dataSource }:
  {
    visualization: baseDefinitionItem[],
    layout: baseDefinitionItem,
    dataSource: baseDefinitionItem[] } = def;
  return (
    <ChakraProvider>
      <Profile />
      <AddMetaData />
      <LoginButton />
      <LogoutButton />
      <Provider
        initialValues={[[definitionAtom, { visualization, layout, dataSource }]]}
      >
        <DataSources />
        <Visualization />
        <Show />
      </Provider>
    </ChakraProvider>
  );
};
export default App;
