const Input = ({ value, placeholder, onChange, logo, item }) => {
  return (
    <div className="relative">
      <input
        defaultValue={value}
        placeholder={placeholder}
        name={item?.name}
        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <p className="text-[16px] leading-[30px] font-[karla] font-normal">{logo}</p>
      </div>
    </div>
  );
};

export default Input;
