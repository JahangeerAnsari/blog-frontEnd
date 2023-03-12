import React, { useEffect, useState, useRef } from "react";
import "./addCategory.css";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  reset,
  fetchSingleCategoryAction,
  updateCategoryAction,
} from "../../redux/slices/category/categorySlices";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategory = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  console.log("id", id);
  const dispatch = useDispatch();
  const notifyS = (msg) => toast.success(msg);
  const notifyE = (msg) => toast.error(msg);

  useEffect(() => {
    dispatch(fetchSingleCategoryAction(id));
  }, [dispatch, id]);

  const { isError, isLoading, isSuccess, message, category } = useSelector(
    (store) => store?.category
  );

  const defaultCategory = category?.category?.title;
  const [inputCategory, setInputCategory] = useState(null);

  console.log("===> data: ", defaultCategory, inputCategory);

  useEffect(() => {
    setInputCategory(defaultCategory);
  }, [defaultCategory]);

  const handleUpdateChange = (e) => {
    setInputCategory(e.target.value);
  };
  useEffect(() => {
    if (isError) {
      console.log("is error", isError);
      notifyE(message);
    }
    if (isSuccess) {
      console.log("isSuccess", isSuccess);
      notifyS(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleUpdateCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAction({ title: inputCategory, id }));
    setTimeout(() => {
      navigate("/category-list");
    }, 1000);
    
  };

  return (
    <div className="add-category">
      <h5>Update Category</h5>
      <form onSubmit={handleUpdateCategorySubmit}>
        <input
          type="text"
          // ref={ref}
          // defaultValue={defaultCategory || ""}
          value={inputCategory}
          placeholder="enter category"
          onChange={handleUpdateChange}
        />
        <div className="add-category">
          <button type="submit">Update Category</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
