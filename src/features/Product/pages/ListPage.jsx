import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import productApi from "../../../api/productApi";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
// import FilterViewer from "../components/Filters/FilterViewer";
// import ProductFilters from "../components/ProductFilters";
// import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import FilterViewer from "../components/Filters/FilterViewer";
// import ProductSort from "../components/ProductSort";

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    padding: "30px 0 20px",
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await productApi.getAll({ _page: 1, _limit: 10 });
  //       console.log(data);
  //       setProductList(data);
  //       //                setPagination(pagination);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("Failed to fetch product list: ", error);
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  const queryParams = useMemo(() => {
    //chi tinh lai khi location.search thay doi
    const params = queryString.parse(location.search); // location.search lay chuoi sau dau ? tren thanh url
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
        //console.log(`data: ${data} paganation ${pagination}`);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    })();

    setLoading(false);
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters), //search la chuoi dang sau dau ?
      //query string chuyen doi filters thanh chuoi
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterViewerChange = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
              />
              left column
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort} //tang dan,giam dan
                onChange={handleSortChange} //khi product sort bi thay doi thi chay ham nay
              />
              <FilterViewer
                filters={queryParams}
                onChange={handleFilterViewerChange}
              />
              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList data={productList} />
              )}
              <Pagination
                color="primary"
                count={Math.ceil(pagination.total / pagination.limit)}
                // cout la so luong trang
                page={pagination.page}
                onChange={handlePageChange} //khi paganation thay doi(click qua trang khac) thi chay ham nay
                className={classes.pagination}
              ></Pagination>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
    //<div>ListPage</div>
  );
}

export default ListPage;
