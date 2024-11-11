import MetaData from "../layouts/MetaData";
import { clearAuthError, login } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  useEffect(() => {
    if (isAuthenticated) {
      //successful login --> navigation to home page
      navigate("/");
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        //altering error state after showing the err msg
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title={"Login"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
