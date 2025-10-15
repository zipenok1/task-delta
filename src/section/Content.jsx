import { useEffect, useState } from "react"
import ImgItems from "../components/ImgItems"
import { getPhoto } from '../api/photoServise'

function Content(){
    const [photo, setPhoto] = useState([])

    useEffect(()=>{
        const getAll = async () => {
            const response = await getPhoto()
            setPhoto(response)
        }
        getAll()
    }, [])  

    return(
        <div className='pt-28 flex justify-center flex-wrap gap-8'>
            {photo.map(el => 
                <ImgItems key={el.id} data={el}/>
            )}
        </div>
    )
}

export default Content