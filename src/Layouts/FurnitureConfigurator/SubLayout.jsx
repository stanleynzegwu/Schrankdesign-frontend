import { Link, useLocation } from "react-router-dom";

const SubLayout = ({ tabs, children }) => {
  const location = useLocation();

  const tempArr = location.pathname.split("/");
  const activePage = tempArr[tempArr.length - 1];

  return (
    <div className="px-[30px] py-[20px] flex-col gap-[30px] flex">
      <div className="flex flex-row gap-[50px]">
        {tabs.map((item, index) => {
          return (
            <div key={index} className="w-fit flex flex-col items-center gap-[10px]">
              <Link
                to={item.to}
                className={`font-[karla] font-bold text-[40px] leading-[46px] ${
                  index === 0 && activePage === "home"
                    ? "text-[#36695C]"
                    : item.label.toLocaleLowerCase() === activePage
                    ? "text-[#36695C]"
                    : "text-[#7B7B7B]"
                }`}
              >
                {item.label}
              </Link>
              {((index === 0 && activePage === "home") ||
                item.label.toLocaleLowerCase() === activePage) && (
                <div className="w-1/2 h-[3px] bg-[#36695C] rounded-full" />
              )}
            </div>
          );
        })}
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default SubLayout;
