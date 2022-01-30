import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Meta } from "../partials/Meta";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { auth, useAuth } from "../lib/firebaseUtil";
import { Input } from "../components/Input";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
export interface FormValues {
  email: string;
  password: string;
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [signUp, setSignUp] = useState<boolean>(false);
  const router = useRouter();

  const handleFormSubmit = async ({ email, password }: FormValues) => {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/channels/@me");
  };

  const handleLoginClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const { user } = await signInWithPopup(auth, provider);
      if (user && user.displayName) useAuth(user, user.displayName);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Meta
        title="Login | Firechat"
        content="Login to experience true bliss!"
      />
      <div>
        <article>
          <div>
            <div>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Input
                  {...(register("email", { required: true }),
                  { type: "email" })}
                  options={{
                    id: "email",
                    label: "Email",
                    shrink: errors.email?.message,
                  }}
                />
                <Input
                  {...(register("password", { required: true }),
                  { type: "password" })}
                  options={{
                    id: "password",
                    label: "Password",
                    shrink: errors.password?.message,
                  }}
                />
                <button type="submit">Login</button>
                <div>
                  <span />
                  <p style={{ padding: "0 8px" }}>OR</p>
                  <span />
                </div>
                <button onClick={handleLoginClick}>Log in with Google</button>
              </form>
              <span>
                Don't have an account ?
                <button onClick={() => setSignUp(true)}>
                  Create an account
                </button>
              </span>
            </div>
          </div>
        </article>
        {/* {signUp && <SignUp setSignUp={setSignUp} />} */}
      </div>
    </>
  );
};

export default Home;
