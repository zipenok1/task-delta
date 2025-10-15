import { useEffect, useState } from "react";
import ImgItems from "../components/ImgItems";
import { getPhoto } from '../api/photoServise';

function Content() {
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem('photos');
    if (cached) {
      setPhoto(JSON.parse(cached));
      return; 
    }

    const getAll = async () => {
      try {
        const response = await getPhoto();
        setPhoto(response);
        localStorage.setItem('photos', JSON.stringify(response)); 
      } catch (error) {
        console.error(error);
      }
    }

    getAll();
  }, []);

  return (
    <div className='pt-28 flex justify-center flex-wrap gap-8'>
      {photo.map(el => <ImgItems key={el.id} data={el} />)}
    </div>
  );
}

export default Content;
