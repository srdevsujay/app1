import React, {
  SelectHTMLAttributes,
  ChangeEventHandler,
  useContext,
} from "react";
import { Select } from "../../../../styled-components/select/index";
import { ErrorLabel } from "../../../../styled-components/input/index";
import { UseFormRegister } from "react-hook-form";
import { ThemeContext } from "../../../../utilities/theme/ThemeContext";

export interface Option {
  value: string;
  label: string;
}

type SelectProps = {
  label?: string;
  options: Option[];
  onChange?: (value: string) => void;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  currentEdit?: any;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange">;

const SelectStateBooking = (props: SelectProps) => {
  // const { label, onChange, options, ...otherPros } = props;
  const {
    label,
    onChange,
    name,
    options,
    register,
    error,
    currentEdit,
    ...otherProps
  } = props;

  // const handleChange: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
  //   onChange && onChange(target.value);
  // };
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {label ? <label htmlFor={name}>{label}</label> : ""}
      <Select {...register(name)} {...otherProps} theme={theme}>
        {options.map((option: any, i = 1) => (
          <option key={i} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>
      {error !== "undefined" ? <ErrorLabel>{error}</ErrorLabel> : ""}
    </>
  );
};

export default SelectStateBooking;
