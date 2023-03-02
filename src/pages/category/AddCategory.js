import React, { useEffect, useState } from "react";
import "./addCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  reset,
  addNewCategoryAction,
} from "../../redux/slices/category/categorySlices";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputCategory, setInputCategory] = useState("");
  console.log("inputCategory", inputCategory);
  const notifyS = (msg) => toast.success(msg);
  const notifyE = (msg) => toast.error(msg);
 
  const { isError, isLoading, isSuccess, message } = useSelector(
    (store) => store?.category
  );

  useEffect(() => {
    if (isError) {
      console.log("is error", isError);
      notifyE(message);
    }
    if (isSuccess) {
      console.log("isSuccess", isSuccess);
      notifyS(message);
     
    }
  }, [isError, isSuccess, message, dispatch]);
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCategoryAction(inputCategory));
    setInputCategory("")
    dispatch(reset());
    navigate("/category-list")

  };
  return (
    <div className="add-category">
      <h5>Add new Category</h5>
      <form onSubmit={handleAddCategorySubmit}>
        <input
          type="text"
          name="category"
          value={inputCategory}
          placeholder="enter category"
          onChange={(e) => setInputCategory(e.target.value)}
        />
        <div className="add-category">
          <button type="submit">AddCategory</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
