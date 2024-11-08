import React, { useMemo } from "react";
import { Field } from "formik";

const CustomField = React.memo(function CustomField({ id, name, disabled }) {
  return (
    <Field
      className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      id={id}
      name={name}
      disabled={disabled}
    />
  );
});

export default CustomField;
