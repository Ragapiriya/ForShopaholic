import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { getProducts } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resultPerPage } =
      useSelector((state) => {
        return state.productsState;
    });
  const [currentPage, setCurrentPage] = useState(1); //current page - first page
  const setCurrentPageNo = (pageNo) => {
      setCurrentPage(pageNo);
  };
  const { keyword } = useParams(); //getting the keyword from the current url
  console.log(currentPage);
  useEffect(() => {
        if (error) {
          return toast.error(error, {
            position: "bottom-center",
          });
        }

        dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, currentPage, keyword]);
  return (
    <Fragment>
      <MetaData title={"Home"} />

      {loading ? (
        <Loader /> //"loading" animaion
      ) : (
        <Fragment>
          {" "}
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resultPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage} //1
                onChange={setCurrentPageNo} //when clicking, pageNo should change
                totalItemsCount={productsCount} //total product count in db
                itemsCountPerPage={resultPerPage} //shows default value
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
