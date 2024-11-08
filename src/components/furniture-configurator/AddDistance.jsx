// import { useState } from 'react';
import SettingsIcon from "/images/furniture_configurator/settings-icon.png?url";

const AddDistance = () => {

    // const [open, setOpen] = useState(false);

    const handleIconClick = (e) => {
      e.stopPropagation();
    }
  
    return [
      <div key={1} className="relative flex w-full justify-center flex-row items-center gap-[10px]">
        <button onClick={handleIconClick} ><img className="w-[20px] h-[20px]" src={SettingsIcon} alt="Setting" /></button>
        <p className="inline-block h-[30px] text-[20px] font-[karla] font-medium text-black">
          Add-Distance
        </p>
      </div>,
      "Add-Distance",
    ];
}

export default AddDistance