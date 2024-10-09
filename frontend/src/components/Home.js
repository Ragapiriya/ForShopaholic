import { Fragment, useEffect } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return state.productsState;
  });
  useEffect(() => {
    dispatch(getProducts);
  }, []);
  return (
    <Fragment>
      {" "}
      <MetaData title={"Home"} />
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products &&
            products.map((product) => (
              <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
                  <img
                    className="card-img-top mx-auto"
                    src={product.images[0].image}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      <a href="">{product.name}</a>
                    </h5>
                    <div className="ratings mt-auto">
                      <div className="rating-outer">
                        <div
                          className="rating-inner"
                          style={{ width: `${(product.ratings * 100) / 5}%` }}
                        ></div>
                      </div>
                      <span id="no_of_reviews">
                        {product.numOfReviews} reviews
                      </span>
                    </div>
                    <p className="card-text">{product.price}</p>
                    <a href="#" id="view_btn" className="btn btn-block">
                      {product.description}
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Fragment>
  );
}
