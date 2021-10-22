import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

//Skeleton tren materiall ui
ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};

ProductSkeletonList.defaultProps = {
  length: 6, //so luong Skeleton se show
};

function ProductSkeletonList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map(
          (
            x,
            index //tao ra 1 mang 6 phan tu sau do .map de render tung phan tu
          ) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box padding={1}>
                <Skeleton variant="rect" width="100%" height={200} />
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
