import { useState } from "react"
import Modal from "./Modal"

function ImgItems({data}) {
    const [isOpen, setIsOpen] = useState(false)

   return(
    <div className="w-md cursor-pointer">
        <div className="w-full h-52 mb-2 rounded-lg overflow-hidden">
            <img 
                onClick={()=> {setIsOpen(true)}}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                src={data.image} 
                alt="img-content" 
            />
        </div>
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