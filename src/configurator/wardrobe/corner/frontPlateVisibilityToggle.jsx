import { Button } from "@material-tailwind/react";
import useDndStore from "../zustand/dndStore";

export default function FrontPlateVisibilityToggle() {
  const storedUser = localStorage.getItem("schrankdesign-app-user");
  const auth = JSON.parse(storedUser);

  const frontplateVisible = useDndStore.use.frontplateVisible();
  const setFrontPlateVisible = useDndStore.use.setFrontPlateVisible();
  return (
    <>
      {auth?.role === 1 && (
        <div className="bg-[#F6F6F6] absolute top-[220px] right-[7px] px-[12px] py-[8px] w-[188px]">
          <div className="relative gap-2">
            <Button
              className={`bg-[#949494] h-[40px] rounded-[2px] mb-1 flex flex-start items-center gap-2 w-full normal-case text-[14px] underline pl-[15px] pr-[9px]`}
              onClick={() => {
                setFrontPlateVisible(!frontplateVisible);
              }}
            >
              {/* <img src={settingIcon} className="w-[22px] h-[22px]" alt="Settings" /> */}
              FrontPlate {frontplateVisible ? "ON" : "OFF"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
