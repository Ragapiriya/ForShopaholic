import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  forgotPassword as forgotPasswordAction,
} from "../../actions/userAction";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.authState);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPasswordAction(formData));
  };
  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "bottom-center",
      });
      setEmail("");
      return;
    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [dispatch, message, error]);
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}
