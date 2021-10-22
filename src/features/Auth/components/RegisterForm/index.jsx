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

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    //dung de bat loi
    fullName: yup
      .string()
      .required("Please enter your full name.")
      .test(
        "Should has at least two words.",
        "Please enter at least two words.",
        (value) => {
          return value.split(" ").length >= 2; //tach chuoi khi gap space ney co do dai >=2 thi true
        }
      ),
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter an valid email address."),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(6, "Please enter at least six characters."),
    retypePassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Password does not match."), //so samh field nay co giong field password o tren ko
  });
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const onhandleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      //await onSubmit(values);
      if (await onSubmit(values)) {
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
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(onhandleSubmit)}>
        <InputField name="fullName" label="Todo" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="RetypePassword"
          form={form}
        />
        <Button
          disabled={isSubmitting} // khi dang loadding thi nut button ko bam dc
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Create an acount
        </Button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
