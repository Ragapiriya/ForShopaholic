import { Button } from "react-bootstrap";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import { deleteUser, getUsers } from "../../actions/userAction";
export default function UserList() {
  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const deleteHandler = (e, id) => {
    e.target.disabled = true; //disabling the button
    dispatch(deleteUser(id));
  };
  const setUsers = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };
    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link to={`/admin/user/${user._id}`} className="btn">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={(e) => deleteHandler(e, user._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });
    return data;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isUserDeleted) {
      //successful creation
      toast.success("User Deleted Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearUserDeleted()),
      });
      return;
    }
    dispatch(getUsers);
  }, [dispatch, error, isUserDeleted, navigate]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="h1 my-4">User List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setUsers()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
