import { Link } from "react-router-dom";
import React from "react";
import SignInForm from "../Register";

export default function Signin() {
  return (
    <>


      <div>
        <SignInForm />
      </div>

      <div className="mt-6 text-center">
        {/* <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Sign up
          </Link>
        </p> */}
      </div>
    </>
  );
}
