import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";

function PasswordField(props) {
  const { name, label, form } = props;
  const { errors, formState } = form;
  const { control } = form;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, error },
        }) => (
          <>
            <FormControl
              error={error && invalid}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              <InputLabel>{label}</InputLabel>
              <OutlinedInput
                id={name}
                error={invalid} // lam cho label ben trong co mau do khi loi
                type={showPassword ? "text" : "password"}
                label={label}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
              <FormHelperText error={invalid}>{error?.message}</FormHelperText>
            </FormControl>
            {/* Outline ko co API error nen phai dung FormHelpText */}
          </>
        )}
      />
    </div>
  );
}

PasswordField.propTypes = {
  name: PropTypes.string.isRequired, //bat buoc phai co
  label: PropTypes.string,
  form: PropTypes.object.isRequired, //bat buoc phai co
  disable: PropTypes.bool,
};

export default PasswordField;
