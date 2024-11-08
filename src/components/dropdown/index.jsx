import { useState } from "react";
import '../../css/dropdown.css';
const Dropdown = ({ options = [], def, onChange }) => {
    const [selected, setSelected] = useState(def || "select");

    const handleChange = (event) => {
        const value = event.target.value;
        setSelected(value);
        onChange(value);
    };

    return (
        <select 
            value={selected}
            onChange={handleChange}
            className="w-full border h-[32px] border-solid border-black bg-[#F6F6F6] rounded-[3px] px-[12px] text-[20px] font-[karla] font-bold custom-select"
        >
            {options.map((item, index) => (
                <option key={index} value={typeof item === 'string' ? item : item[1]}>
                    {typeof item === 'string' ? item : item[0]}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
