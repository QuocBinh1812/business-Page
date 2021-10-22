import React from "react";
import PropTypes from "prop-types";
import { Button, Divider, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});
function NotFound(props) {
  const classes = useStyles();
  const history = useHistory();
  const changeToProduct = () => {
    history.push("/products");
  };
  console.log("notFound");
  return (
    <div>
      NOT Founh
      <Divider></Divider>
      <Button className={classes.root} onClick={changeToProduct}>
        {/* Button cua material-ui */}
        GO TO MyShop
      </Button>
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
