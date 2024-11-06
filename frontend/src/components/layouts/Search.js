import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation(); //it will give the current URL path
  const [keyword, setKeyword] = useState("");

  const searchHandler = (event) => {
    event.preventDefault(); //prevents browser refreshing
    navigate(`/search/${keyword}`); //redirect to another url
  };

  const clearKeyword = () => {
    //removing keyword after navigate to home page
    setKeyword("");
  };
  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder="Enter Product Name ..."
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
