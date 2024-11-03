import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import {  getSearchedProducts } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify"; 
import { useParams } from "react-router-dom";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productsState);
  const { keyword } = useParams(); // getting the keyword from the current url

  useEffect(() => {
    if (error) {
      return toast.error(error, { position: "bottom-center" });
    }

    // Fetch products without pagination
    dispatch(getSearchedProducts(keyword));
  }, [dispatch, error, keyword]);

  return (
    <Fragment>
      <MetaData title={"Home"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
