import { useState } from "react"
import Modal from "./Modal"

function ImgItems({data}) {
    const [isOpen, setIsOpen] = useState(false)


   return(
    <div className="w-md cursor-pointer">
        <img 
            onClick={()=> {setIsOpen(true)}}
            className="w-full h-52 mb-2 rounded-lg"
            src={data.image} 
            alt="img-content" 
        />
        <p className="">id: {data.id}</p>
        <Modal  
            id={data.id}
            isOpen={isOpen} 
            onClose={() => {setIsOpen(false)}}
        />
    </div>
   ) 
}

export default ImgItems