import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
// import createApolloClient from '../utils/apolloClient';

export const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  // const apolloClient = createApolloClient(authStorage);
  // note typo above ... :/
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    const token = await data.authorize.accessToken;
    await authStorage.setAccessToken(token);
    await apolloClient.resetStore();
  };

  return [signIn, result];
};
