import { Button } from "react-bootstrap";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  clearError,
  clearOrderDeleted,
  isOrderDeleted,
} from "../../slices/orderSlice";
import { deleteOrder, adminOrders as getAdminOrders } from "../../actions/orderAction";
export default function OrderList() {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const deleteHandler = (e, id) => {
    e.target.disabled = true; //disabling the button
    dispatch(deleteOrder(id));
  };
  const setOrders = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Number of Items", field: "noOfItems", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Status", field: "status", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };
    adminOrders.forEach((adminOrder) => {
      data.rows.push({
        id: adminOrder._id,
        noOfItems: adminOrder.orderItems.length,
        amount: `$${adminOrder.totalPrice}`,
        status: (
          <p
            style={{
              color: adminOrder.orderStatus === "Processing" ? '#845ec2' : '#4e8397',
            }}
          >
            {adminOrder.orderStatus}
          </p>
        ),
        actions: (
          <Fragment>
            <Link to={`/admin/order/${adminOrder._id}`} className="btn">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={(e) => deleteHandler(e, adminOrder._id)}
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
    if (isOrderDeleted) {
      //successful creation
      toast.success("Order Deleted Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderDeleted()),
      });
      return;
    }
    dispatch(getAdminOrders);
  }, [dispatch, error, isOrderDeleted, navigate]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="h1 my-4">Order List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
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
