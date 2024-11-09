import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, register } from "../../actions/userAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    //text data
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = (event) => {
    if (event.target.name === "avatar") {
      //avatar input
      //reading file data [img]
      const reader = new FileReader(); //file reader obj to get the url of file data
      reader.onload = () => {
        if (reader.readyState === 2) {
          //file reading completed
          setAvatarPreview(reader.result); //url of file data
          setAvatar(event.target.files[0]);
        }
      };
      reader.readAsDataURL(event.target.files[0]); //alter the file data into url
    } else {
      //text data input
      setUserData({ ...userData, [event.target.name]: event.target.value });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };
  useEffect(() => {
    if (isAuthenticated) {
      //successful registration --> navigation to home page
      navigate("/");
      return;
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
  }, [error, dispatch, isAuthenticated]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          onSubmit={submitHandler}
          className="shadow-lg"
          encType="multipart/form-data"
        >
          <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input
              name="name"
              onChange={onChange}
              type="name"
              id="name_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              name="email"
              onChange={onChange}
              type="email"
              id="email_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              name="password"
              onChange={onChange}
              type="password"
              id="password_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="image"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  onChange={onChange}
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
