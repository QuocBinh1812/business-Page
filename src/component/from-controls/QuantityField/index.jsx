import {
  Box,
  FormHelperText,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},

  box: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    maxWidth: "200px",
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { errors, setValue, control } = form;
  //const hasError = !!errors[name];

  return (
    // <FormControl
    //   error={errors}
    //   fullWidth
    //   margin="normal"
    //   variant="outlined"
    //   size="small"
    // >
    //   <Typography>{label}</Typography>

    //   <Controller
    //     name={name}
    //     control={control}
    //     render={({ onChange, onBlur, value, name }) => (
    //       <Box className={classes.box}>
    //         <IconButton
    //           onClick={() =>
    //             setValue(
    //               name,
    //               Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
    //             )
    //           }
    //         >
    //           <RemoveCircleOutline />
    //         </IconButton>

    //         <OutlinedInput
    //           id={name}
    //           type="number"
    //           disabled={disabled}
    //           value={value}
    //           onChange={onChange}
    //           onBlur={onBlur}
    //         />

    //         <IconButton
    //           onClick={() =>
    //             setValue(
    //               name,
    //               Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
    //             )
    //           }
    //         >
    //           <AddCircleOutline />
    //         </IconButton>
    //       </Box>
    //     )}
    //   />

    //   <FormHelperText>{errors?.message}</FormHelperText>
    // </FormControl>

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
              <Typography>{label}</Typography>
              <Box className={classes.box}>
                <IconButton
                  onClick={() =>
                    //giam gia tri hien tai di 1
                    setValue(
                      name, //ten control
                      Number.parseInt(value) ? Number.parseInt(value) - 1 : 1 //chuyen chuoi trong outline input thanh int de -1
                    )
                  }
                >
                  <RemoveCircleOutline />
                </IconButton>

                <OutlinedInput
                  id={name}
                  error={invalid}
                  //label={label}
                  type="number"
                  disabled={disabled}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />

                <IconButton
                  onClick={() =>
                    setValue(
                      name,
                      Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                    )
                  }
                >
                  <AddCircleOutline />
                </IconButton>
              </Box>
              <FormHelperText error={invalid}>{error?.message}</FormHelperText>
            </FormControl>

            {/* Outline ko co API error nen phai dung FormHelpText */}
          </>
        )}
      />
    </div>
  );
}

export default QuantityField;
