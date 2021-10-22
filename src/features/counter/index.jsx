import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "./counterSlice";
import styles from "./styles.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//material-ui styles
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

function CounterFeature(props) {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const classes = useStyles({});
  const handleIncreaseClick = (counter) => {
    const action = increase();
    console.log(action);
    dispatch(action);
  };
  const handleDecreaseClick = (counter) => {
    const action = decrease();
    console.log(action);
    //dispatch(action);
    dispatch(decrease());
  };
  return (
    //su dung css module cho the div
    <div className={styles.counter}>
      Counter:{count}
      <div>
        <Button className={classes.root} onClick={handleIncreaseClick}>
          {/* Button cua material-ui */}
          Increase
        </Button>
        <Button className={classes.root} onClick={handleDecreaseClick}>
          Decrease
        </Button>
      </div>
    </div>
  );
}

CounterFeature.propTypes = {};

export default CounterFeature;
