import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const CustomDateInput = ({ id, value, onChange, className }) => {
  const [displayValue, setDisplayValue] = useState(value || "");

  function handleInputChange(e) {
    const input = e.target.value.replace(/[^0-9]/g, "");
    let formattedValue = "";

    if (input.length > 0) {
      formattedValue += input.substring(0, 2);
      if (input.length > 2) {
        formattedValue += "/" + input.substring(2, 4);
        if (input.length > 4) {
          formattedValue += "/" + input.substring(4, 8);
        }
      }
    }

    setDisplayValue(formattedValue);
    onChange(formattedValue);
  }

  return (
    <Input
      id={id}
      placeholder="DD/MM/YYYY"
      value={displayValue}
      onChange={handleInputChange}
      className={className}
      maxLength={10} // Giới hạn độ dài tối đa
    />
  );
};

export default CustomDateInput;
