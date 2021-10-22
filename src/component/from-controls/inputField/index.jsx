import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
///          use REACT-HOOK-FORM
function InputField(props) {
  const { name, label, form, disable } = props;
  const { errors, formState } = form;
  // const hasE = formState.touched[name] && errors[name];
  // console.log(errors[name], formState[name]);
  //   console.log(control);
  return (
    // <Controller
    //   name={name}
    //   control={form.control}
    //   fullwidth
    //   disable={disable}
    //   render={({ field, fieldState: { invalid, error } }) => (
    //     <TextField
    //       {...field}
    //       label={label}
    //       error={invalid}
    //       helperText={error?.message}
    //     />
    //   )} //se ren der ra textfeild cua material-ui
    // />
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          error={invalid}
          helperText={error?.message}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          disabled={disable}
        />
      )}
    ></Controller>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired, //bat buoc phai co
  label: PropTypes.string,
  form: PropTypes.object.isRequired, //bat buoc phai co
  disable: PropTypes.bool,
};

export default InputField;
