import { Button } from "react-bootstrap";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../slices/productsSlice";
import { getAdminProducts } from "../../actions/productsActions";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { deleteProduct } from "../../actions/productAction";
import { clearProductDeleted } from "../../slices/productSlice";

export default function ProductList() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { error: productError, isProductDeleted } = useSelector(
    (state) => state.productState
  );
  const deleteHandler = (e, id) => {
    e.target.disabled = true; //disabling the button
    dispatch(deleteProduct(id));
  };
  const setProducts = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Price", field: "price", sort: "asc" },
        { label: "Stock", field: "stock", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };
    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link to={`/admin/product/${product._id}`} className="btn">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={(e) => deleteHandler(e, product._id)}
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
    if (error || productError) {
      toast.error(error || productError, {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      //successful creation
      toast.success("Product Deleted Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      navigate("/admin/products");
      return;
    }
    dispatch(getAdminProducts);
  }, [dispatch, error,productError, isProductDeleted, navigate]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
      <h1 className="h1 my-4">Product List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProducts()}
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
