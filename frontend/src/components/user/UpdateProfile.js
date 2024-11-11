import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, updateProfile } from "../../actions/userAction";
import { toast } from "react-toastify";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
  const { error, isUpdated, user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const onChangeAvatar = (e) => {
    //avatar input
    //reading file data [img]
    const reader = new FileReader(); //file reader obj to get the url of file data
    reader.onload = () => {
      if (reader.readyState === 2) {
        //file reading completed
        setAvatarPreview(reader.result); //url of file data
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]); //alter the file data into url
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        //user profile is optional
        setAvatarPreview(user.avatar);
      }
    }
    if (isUpdated) {
      //successful update
      toast.success("Profile updated successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearUpdateProfile()) 
      });
      console.log("Updat4ed");
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
  }, [error, dispatch, isUpdated, user]);
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          onSubmit={submitHandler}
          className="shadow-lg"
          encType="multipart/form-data"
        >
          <h1 className="mt-2 mb-5">Update Profile</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                    alt="Avatar Preview"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChangeAvatar}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
