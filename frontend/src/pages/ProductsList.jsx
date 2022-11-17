import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import { MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/slices/productsSlice";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const ProductsList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const category = location.state?.category;
  const [filter, setFilter] = useState({
    sort: "newest",
  });
  const categoryList = ["men", "women"];
  const colorList = ["Blue", "Black", "White", "Red"];

  const handleFilters = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if(!!category) {
      setFilter((prev) => {
        return {
          ...prev,
          category: "men",
        };
      });
    }
  }, [category]);
  

  useEffect(() => {
    dispatch(getProducts(filter));
  }, [filter]);

  return (
    <div>
      <div className="flex mt-8 flex-wrap justify-between mx-4 text-3xl">
        <div className=" flex flex-col ">
          <span className="ml-2">Filters</span>
          <div className="flex flex-col xsm:flex-row">
            <Select
              displayEmpty
              name="category"
              value={filter.category ?? "category"}
              onChange={handleFilters}
              className="mr-2 mt-2 w-18 h-11"
            >
              <MenuItem value="category" disabled>
                Category
              </MenuItem>
              {categoryList.map((item) => (
                <MenuItem className="w-18" value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Select
              displayEmpty
              name="color"
              onChange={handleFilters}
              value={filter.color ?? "color"}
              className="w-18 mt-2 h-11"
            >
              <MenuItem value="color" disabled>
                Color
              </MenuItem>
              {colorList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <div
              className="flex justify-center items-center ml-2 mt-2 cursor-pointer"
              onClick={() =>
                setFilter((prev) => {
                  return {
                    sort: prev.sort,
                  };
                })
              }
            >
              <AutorenewIcon />
            </div>
          </div>
        </div>
        <div className="ml-4 flex flex-col">
          <span className="ml-2">Sort</span>
          <Select
            displayEmpty
            defaultValue={"newest"}
            name="sort"
            value={filter.sort}
            onChange={handleFilters}
            className="w-30 mt-2 h-11"
          >
            <MenuItem value={"newest"}>Newest</MenuItem>
            <MenuItem value={"oldest"}>Oldest</MenuItem>
            <MenuItem value={"asc"}>Price (ASC) </MenuItem>
            <MenuItem value={"desc"}>Price (DSC)</MenuItem>
          </Select>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductsList;
