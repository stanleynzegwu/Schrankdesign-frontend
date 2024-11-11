import { Button } from "@material-tailwind/react"
import configuratorIdIcont from "@src/assets/icons/configuratorId.png";
import { useState } from "react";
import { ConfirmProduct } from "@src/api/api"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ConfiguratorID(props) {
  const { configId, slug } = props
  const storedUser = localStorage.getItem("schrankdesign-app-user");
  const navigate = useNavigate();
  const auth = JSON.parse(storedUser);
  const [modal, setModal] = useState(false)
  const [action, setAction] = useState(false)
  const [productId, setProductId] = useState(configId)
  
  const reload = () => {
    if (action) {
      navigate(`/product/${slug}/${productId}`)
      window.location.reload();
    } else {
      navigate(`/product/${slug}/${productId}`)
      window.location.reload();
    }
    setModal(false)
  }

  return (
    <div className="bg-[#ffffff] absolute left-[843px] top-[20px] ">
      {(import.meta.env.MODE === 'development' || auth?.role == 1) && (    
        <div className="flex border border-black">
          <Button
            className=" bg-[#ffffff] text-[#000000] normal-case text-[14px] flex items-center gap-2 rounded-[2px] pl-[10px] pr-[6px] h-[39px]"
            onClick={async() => {
              const { data, error } = await ConfirmProduct(productId)
              if (data.exist) {
                setModal(true)
                setAction(false)
              } else {
                toast.error("There is no existing product!")
              }
              
            }}
          >
            <img src={configuratorIdIcont}></img>
            Konfigurator laden
          </Button>
          <div className="bg-[#ffffff] text-[14px] m-2 rounded-[3px] flex">
            <input value={productId} 
              className="w-16 font text-center outline-none border border-black"
              onChange={(e) => setProductId(e.target.value)}  
              onKeyDown={async(e) => {
                if (e.key === 'Enter') {
                  setAction(true)
                  const { data, error } = await ConfirmProduct(productId)
                  if (data.exist) {
                    setModal(true)
                  } else {
                    toast.error("There is no existing product!")
                  }
                }
              }}
            />
          </div>
        </div>
          
      )}
      <>
        { modal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-[#D9D9D9] border border-red-600 rounded-lg shadow-lg p-6 h-auto w-[80%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] overflow-y-auto z-50">
              <div className="flex justify-center mb-4">
                <img src="/images/info.png"></img>
              </div>
              <div className="flex justify-center text-xl">
                Do you really want to load a new configuration?
              </div>
              <div className="flex mt-10 gap-10">
                <button
                  className="bg-[#36695C] site-button ml-auto mr-3 py-2 px-4 hover:px-4 text-sm font-normal"
                  onClick={() =>{
                    reload()
                  }}
                >Yes</button>
                <button
                  className="bg-[#36695C] site-button mr-auto ml-3 py-2 px-5 hover:px-5 text-sm font-normal"
                  onClick={() => setModal(false)}
                >No</button>
              </div>
            </div>
          </div>
        )}
        
      </>
    </div>   
  )
}
