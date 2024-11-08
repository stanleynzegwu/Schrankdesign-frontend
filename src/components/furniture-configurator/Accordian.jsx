import { Collapse } from "@material-tailwind/react";
import { useState, Children, isValidElement, cloneElement } from "react";

const Accordian = ({ beforeCollapse, afterCollapse, add, setState, index, onClose }) => {
  const [open, setOpen] = useState(add ? add : false);

  const handleToggle = () => {
    if (open && onClose) {
      onClose(); // Call the onClose function if provided and the accordion is closing
    }
    setOpen(!open);
    setState && setState(false);
  };

  const afterCollapseWithProps = Children.map(afterCollapse, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { handleToggle });
    }
    return child;
  });

  const beforeCollapseWithProps = Children.map(beforeCollapse, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { handleToggle });
    }
    return child;
  });

  return (
    <div className="mb-3" key={index}>
      {open && (
        <div>
          <div className="h-full flex items-center shadow-md bg-white border-2 border-solid border-[#d9d9d9] rounded-[12px]">
            {afterCollapseWithProps}
          </div>
        </div>
      )}
      {!open && (
        <div className="py-4 px-5 shadow-md flex items-center justify-between flex-wrap bg-white w-full border-2 border-solid border-[#d9d9d9] rounded-[12px]">
          {beforeCollapseWithProps}
        </div>
      )}
    </div>
  );
};

export default Accordian;
