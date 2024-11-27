import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../actions/userAction";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);

    dispatch(updateUser(userId, formData));
  };

  //getting prod details
  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user._id]);

  //alert
  useEffect(() => {
    if (isUserUpdated) {
      //successful creation
      toast.success("User Updated Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearUserUpdated()),
      });
      navigate("/admin/users");
      return;
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        //altering error state after showing the err msg
        onOpen: () => {
          dispatch(clearError);
        },
      });
      return;
    }
    dispatch(getUser(userId));
  }, [dispatch, isUserUpdated, error, navigate]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              enctype="multipart/form-data"
            >
              <h1 className="h1 mb-4">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  id="name_field"
                  className="form-control"
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Email</label>
                <input
                  type="text"
                  id="price_field"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  value={email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Role</label>
                <select
                  disabled={user._id === authUser._id}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control"
                  id="category_field"
                  value={role}
                >
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
