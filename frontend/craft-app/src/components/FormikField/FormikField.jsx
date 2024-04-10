import { ErrorMessage } from "formik";
import "./FormikField.css";

export const FormikField = ({ field, label, form, ...props }) => (
  <div className="mb-3" >
    <label>{label} </label>
    <input {...field} {...props} />
   
    <ErrorMessage name={field.name}>
      {(msg) => <div className="form-error-message">{msg}</div>}
    </ErrorMessage>
  </div>
);
