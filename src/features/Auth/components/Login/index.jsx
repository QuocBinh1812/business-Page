import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import { useSnackbar } from "notistack";
import LoginForm from "../LoginForm";
function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // dung de show thong bao noti stack

  const handleSubmit = async (values) => {
    try {
      // auto set user name =email
      values.username = values.email;
      console.log("form submit1: ", values);
      const action = login(values);
      const user = await dispatch(action).unwrap(); //redux toolkit createAsyncThunk Unwrapping Result Actions
      //close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log("fail to register", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

Login.propTypes = {
  closeDialog: PropTypes.func,
};

export default Login;
