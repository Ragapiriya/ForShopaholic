import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";
import { getProduct, updateProduct } from "../../actions/productAction";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);

  const [imagesPreview, setImagesPreview] = useState([]);

  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isProductUpdated, error, product } = useSelector(
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
    formData.append("imagesCleared", imagesCleared);

    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateProduct(productId,formData));
  };
  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  //getting prod details
  useEffect(() => {
    if (product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      let images = []; 
      product.images.forEach((image) => {
        images.push(image.image);
      });
      setImagesPreview(images);
    }
  }, [product._id]);

  //alert
  useEffect(() => {
    if (isProductUpdated) {
      //successful creation
      toast.success("Product Updated Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearProductUpdated()),
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
    dispatch(getProduct(productId));
  }, [dispatch, isProductUpdated, error, navigate]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              enctype="multipart/form-data"
            >
              <h1 className="h1 mb-4">Update Product</h1>

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
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                  value={category}
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
                {imagesPreview.length > 0 && (
                  <span
                    className="mr-2"
                    style={{ cursor: "pointer" }}
                    onClick={clearImagesHandler}
                  >
                    <i className="fa fa-trash"></i>
                  </span>
                )}
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
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
