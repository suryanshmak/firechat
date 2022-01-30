import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from "next/router";
import randomatic from "randomatic";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "firechat-f51c7.firebaseapp.com",
  projectId: "firechat-f51c7",
  storageBucket: "firechat-f51c7.appspot.com",
  messagingSenderId: "618428779274",
  appId: "1:618428779274:web:cd16a01902b0fa3c54c8f3",
  measurementId: "G-8GPSHDDPM2",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

export const auth = getAuth();

// const ADD_USER = gql`
//   mutation AddUser($username: String, $email: String, $user_uid: String) {
//     insert_users(
//       objects: { username: $username, email: $email, user_uid: $user_uid }
//       on_conflict: { constraint: users_pkey, update_columns: [] }
//     ) {
//       affected_rows
//     }
//   }
// `;

export const useAuth = (user: User, username: string) => {
  const router = useRouter();
  // const [addUser] = useMutation(ADD_USER);

  updateProfile(user, {
    displayName: `${username}#${randomatic("0", 4)}`,
  });
  // await addUser({
  //   variables: {
  //     username: user.displayName,
  //     email: user.email,
  //     user_uid: user.uid,
  //   },
  // });
  router.push("/channels/@me");
};
