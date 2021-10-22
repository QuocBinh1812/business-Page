import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import DOMPurify from "dompurify";

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description);
  //do product.desscription la chuoi HTML nen co the co cac doan xss script load du lieu cua ta cho hacker
  //dung safeDescscripttion de loai bo cac file xss script
  return (
    <Paper elevation={0} style={{ padding: "15px" }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
      {/* dangerouslySetInnerHTML dung de render cac api tra ve doan code html */}
    </Paper>
  );
}

export default ProductDescription;
