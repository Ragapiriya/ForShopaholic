import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productsActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isProductCreated, error } = useSelector(
    (state) => state.productState
  );
  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Foods",
    "Books",
    "Cloths/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];
  const onImagesChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createNewProduct(formData));
  };
  useEffect(() => {
    if (isProductCreated) {
      //successful creation
      toast.success("Product Created Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
      return;
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        //altering error state after showing the err msg
        onOpen: () => {
          dispatch(clearError);
        },
      });
      return;
    }
  }, [dispatch, isProductCreated, error, navigate]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Products List</h1>
        <Fragment>
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              enctype="multipart/form-data"
            >
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  id="name_field"
                  className="form-control"
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                  value={price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="description_field"
                  rows="5"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                {imagesPreview.map((image) => (
                  <img
                    src={image}
                    key={image}
                    className="mt-3 mr-2"
                    alt={"Image Preview"}
                    width="55"
                    height="52"
                  />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                CREATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
