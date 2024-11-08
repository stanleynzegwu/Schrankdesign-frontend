import React from "react"

const Mark = ({id, img, title, description}) => {
  return (
    <div className={`flex items-center py-4 ${id == 3 ? "ml-auto" : "mx-auto"} `}>
      <img
        src={img}
        alt="MarkIcon"
        style={{ width: 45, height: 45 }}
        className="mr-4"
      />
      <div className="flex flex-col">
        <p className="text-[1rem] font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}

export default Mark