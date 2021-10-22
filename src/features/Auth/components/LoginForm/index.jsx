import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../component/from-controls/inputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Avatar, Button, LinearProgress, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import PasswordField from "../../../../component/from-controls/PasswoedField";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    position: "relative",
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 4, 0),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  process: {
    position: "absolute",
    top: theme.spacing(-1),
    left: 0,
    right: 0,
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    //dung de bat loi

    identifier: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter an valid email address."),
    password: yup.string().required("Please enter your password."),
  });
  const form = useForm({
    defaultValues: {
      identifier: "", //do quy dinh gui len api la identyfier
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onhandleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      //await onSubmit(values);
      if (await onSubmit(values)) {
        //ham onSubmit se chay o day
        // neu ham onsubmit ko co lo thi chay code in if
        form.reset(); // khi submit xong se reset form
      }
    }
  };
  const { isSubmitting } = form.formState; //lam thanh process

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.process} />}
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={form.handleSubmit(onhandleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={isSubmitting} // khi dang loadding thi nut button ko bam dc
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
