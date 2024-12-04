import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { getSearchedProducts } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsState
  );
  const { keyword } = useParams(); // getting the keyword from the current url
  const [price, setPrice] = useState([1, 100]);
  const categories = [
    "Facial Cleanser",
    "Moisturizing Lotion",
    "Body Cream",
    "Body Scrub",
    "Body Soap",
    "Body Oil",
    "Hair Conditioner", 
    "Shampoo",
    "Deodorant",
    "Shower Gel",
    "Lip Balm",
    "Sunscreen",
  ];
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (error) {
      return toast.error(error, { position: "bottom-center" });
    }

    // Fetch products without pagination
    dispatch(getSearchedProducts(keyword, price, category, rating));
  }, [dispatch, error, keyword, price, category, rating]);

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
              <div className="col-6 col-md-3 mb-5 mt-5">
                {/* Price Filter */}
                <h3 className="mb-3">Price_Range</h3>
                <div className="px-5">
                  {/* range slider */}
                  <Slider
                    range={true}
                    marks={{
                      1: "$1",
                      100: "$100",
                    }}
                    min={1}
                    max={100}
                    defaultValue={price}
                    onChangeComplete={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`$${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="my-5" />
                {/* Category filter  */}
                <div className="mt-5">
                  <h3 className="mb-3">Categories</h3>
                  <ul className="pl-0">
                    {categories.map((category) => (
                      <li
                        style={{ cursor: "pointer", listStyleType: "none" }}
                        key={category}
                        onClick={() => {
                          setCategory(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-1" />
                {/* rating filter  */}
                <div className="mt-5">
                  <h3 className="mb-3">Ratings</h3>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{ cursor: "pointer", listStyleType: "none" }}
                        key={star}
                        onClick={() => {
                          setRating(star);
                        }}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${star * 20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product col={4} key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
