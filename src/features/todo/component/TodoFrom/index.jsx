import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../component/from-controls/inputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function TodoFrom(props) {
  const schema = yup.object().shape({
    //dung de bat loi
    title: yup
      .string()
      .required("please entert title") //bat loi bo trong cho feild title
      .min(5, "title is too short"), // bat loi so luong be hon 5 ky tu
  });
  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });
  const { register } = useForm();
  const onhandleSubmit = (values) => {
    console.log("Todo Form 1", values);
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset(); // khi submit xong se reset form
  };

  return (
    <form onSubmit={form.handleSubmit(onhandleSubmit)}>
      <InputField name="title" label="Todo" form={form} register={register} />
    </form>
  );
}

TodoFrom.propTypes = {
  onSubmit: PropTypes.func,
};

export default TodoFrom;

/// demo

// import React from "react";
// import { useForm } from "react-hook-form";
// import PropTypes from "prop-types";
// export default function TodoFrom() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = (data) => console.log(data);

//   console.log(watch("example")); // watch input value by passing the name of it

//   return (
//     /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* register your input into the hook by invoking the "register" function */}
//       <input defaultValue="test" {...register("example")} />

//       {/* include validation with required or other standard HTML validation rules */}
//       <input {...register("exampleRequired", { required: true })} />
//       {/* errors will return when field validation fails  */}
//       {errors.exampleRequired && <span>This field is required</span>}

//       <input type="submit" />
//     </form>
//   );
// }
// TodoFrom.propTypes = {
//   onSubmit: PropTypes.func,
// };
