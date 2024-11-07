import { Link } from "react-router-dom";
import React from "react";
import SigninWithPasswordL from "../Login";

export default function Signin() {
  return (
    <>


      <div>
        <SigninWithPasswordL />
      </div>

      <div className="mt-6 text-center">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
