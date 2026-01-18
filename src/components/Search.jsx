import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className="form-control"
            placeholder="Enter Product Name ..."
          />
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </form>
      
    </>
  );
};
export default Search;
