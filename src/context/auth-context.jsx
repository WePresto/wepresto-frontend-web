import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getToken } from "firebase/messaging";

import firebaseApp from "../firebase/config";

import environment from "@wepresto/environment";

import userService from "@wepresto/services/user.service";

import Loading from "@wepresto/components/Loading";

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext({ user: undefined });

const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let userFromApi;
        try {
          userFromApi = await userService.getOne({ authUid: firebaseUser.uid });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log("error getting user...");
          console.error(error);
        }

        if (!userFromApi) {
          // eslint-disable-next-line no-console
          console.log("user not found in api");
          setLoading(false);
          return;
        }

        // merging the user from firebase and the user from the api
        const mergedUser = { ...firebaseUser, ...userFromApi };

        // setting the user in the context
        setUser(mergedUser);

        // check if the browser supports service worker
        if (navigator.serviceWorker) {
          let fcmToken;

          try {
            // get the service worker registration
            const registration = await navigator.serviceWorker.ready;

            // subscribe to push notifications
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: environment.FIREBASE_WEB_PUSH_KEY,
            });

            // import the messaging-sw file
            const { default: messaging } = await import(
              "@wepresto/firebase/messaging-sw"
            );

            // get the current token
            const currentToken = await getToken(messaging, {
              vapidKey: environment.FIREBASE_WEB_PUSH_KEY,
              serviceWorkerRegistration: registration,
            });

            if (!currentToken) {
              // eslint-disable-next-line no-console
              console.log(
                "no registration token available. Request permission to generate one.",
              );
              return;
            }

            fcmToken = currentToken;
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log("an error occurred while retrieving token...");
            console.error(error);
          }

          // check if the fcm token is set
          if (fcmToken && fcmToken !== mergedUser.fcmToken) {
            // check if the fcm token is the same as the one in the api
            // if not, update the fcm token in the api
            try {
              await userService.changeFcmtoken({
                authUid: firebaseUser.uid,
                fcmToken,
              });
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log("error changing fcm token...");
              console.error(error);
            }
          }
        }
      } else {
        setUser(undefined);
      }

      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
