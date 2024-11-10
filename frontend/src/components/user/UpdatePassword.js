import { useState, useEffect } from "react";
import {
  clearAuthError,
  updatePassword as updatePasswordAction, 
} from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function () {
  const [newPassword, setnewPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");
  const dispatch = useDispatch();
  const { error, isUpdated } = useSelector((state) => state.authState);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    dispatch(updatePasswordAction(formData));
  };
  useEffect(() => {
    if (isUpdated) {
      //successful update
      toast.success("Password updated successfully", {
        position: "bottom-center",
      });
      setnewPassword("");
      setcurrentPassword("");
      return;
    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        //altering error state after showing the err msg

        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [isUpdated, dispatch, error]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
          <h1 className="mt-2 mb-5">Update Password</h1>
          <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setcurrentPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
