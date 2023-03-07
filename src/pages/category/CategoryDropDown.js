import React, { useEffect } from 'react'
import Select from 'react-select';
import {
  fetchedCategories,
  
} from "../../redux/slices/category/categorySlices";
import { useDispatch, useSelector } from "react-redux";

const CategoryDropDown = (props) => {
  const {setSelectedCategory} = props;
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(fetchedCategories())
  },[dispatch]);
  const { categoryList } = useSelector(
    (store) => store?.category
  );
  console.log("categoryList dropdown",categoryList)
  const allCategories = categoryList?.categories.map((category) => {
    return {
      label: category?.title,
      value: category?._id
    }
  })
  console.log("allCategories",allCategories);
  const handleCategoryChange = (e) =>{
    console.log("event ",e) 
  setSelectedCategory({label:e?.label,value:e?.value})
  // setSelectedCategory({label:e.label,value:e.value})
  }

  return (
    <Select options={allCategories} onChange={handleCategoryChange} />
  )
}

export default CategoryDropDown