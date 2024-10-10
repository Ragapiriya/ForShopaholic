import { Fragment, useEffect } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => {
    return state.productsState;
  });
  useEffect(() => {
    if(error)
    {
      return toast.error(error, {
        position: "bottom-center",
      });
    }
   
    dispatch(getProducts);
  }, [dispatch,error]);
  return (
    <Fragment>
      <MetaData title={"Home"} />

      {loading ? (
        <Loader /> //"loading" animaion
      ) : (
        <Fragment>
          {" "}
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => <Product product={product} />)}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
