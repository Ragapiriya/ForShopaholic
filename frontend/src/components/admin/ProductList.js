import { Button } from "react-bootstrap";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../slices/productsSlice";
import { getAdminProducts } from "../../actions/productsActions";
import Loader from '../layouts/Loader';
import {MDBDataTable} from 'mdbreact';
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ProductList() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
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
            <Button className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });
    return data;
};
const dispatch = useDispatch();
useEffect(()=>{
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    dispatch(getAdminProducts);
},[dispatch,error]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
       <Fragment>
        {loading ?
        <Loader/> : 
        <MDBDataTable
        data={setProducts()}
        bordered
        striped
        hover
        className="px-3"
        />
        }
       </Fragment>
      </div>
    </div>
  );
}
