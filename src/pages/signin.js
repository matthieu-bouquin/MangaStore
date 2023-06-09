import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import initFirebase from '@components/config';
import { setUserCookie } from '../auth/userCookie';
import { mapUserData } from '../auth/useUser';

import Layout from '@components/Layout';
import Head from 'next/head';
import Container from '@components/Container';
import styles from '../styles/Page.module.scss'

initFirebase();
const firebaseAuthConfig = ({ signInSuccessUrl }) => ({
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl,
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = await mapUserData(user);
      setUserCookie(userData);
    }
  }
});

const FirebaseAuth = () => {
  const signInSuccessUrl = "/private"
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container className={styles.fullHeight}>
      <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
        firebaseAuth={firebase.auth()}
        signInSuccessUrl={signInSuccessUrl}
      />
    </div>
      </Container>
    </Layout>
  );
};

export default FirebaseAuth;



