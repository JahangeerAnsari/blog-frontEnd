import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchedCategories,reset } from "../../redux/slices/category/categorySlices";
import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DateFormatter from "../../utils/DateFormatter";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchedCategories());
    dispatch(reset())
  }, [dispatch]);
  const { isError, isLoading, isSuccess, message, categoryList } = useSelector(
    (store) => store?.category
  );
  console.log("categoryList555",categoryList)
  
 
  // useEffect(() =>{
  //   dispatch(reset());
  // },[dispatch])
 
  return (
    <Container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">CreatedAt(g)</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryList && categoryList?.categories.map((category,index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                  <Avatar alt="Remy Sharp" src={category?.user?.profilePhoto} />
                  <span>{category?.user?.name}</span>,
                  <span>{category?.user?.email}</span>
                  </TableCell>
                  <TableCell align="right">{category?.title}</TableCell>
                  <TableCell align="right">
                    <DateFormatter date={category?.createdAt}/>
                    </TableCell>
                  <TableCell align="right">
                   <Link to={`/update-category/${category._id}`}>
                   <EditIcon/>
                   </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CategoryList;
