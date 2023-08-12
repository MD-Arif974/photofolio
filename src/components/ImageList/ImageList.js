
  // Images import
import styles from "./ImageList.module.css";
import back from "../../images/back.png";
import search from "../../images/search.png";
import edit from '../../images/edit.png';
import dlt from '../../images/delete.png';

// Components imported

import ImageForm from "../ImageForm/ImageForm";
import Carousel from "../Carousel/Carousel";


// import db

import {db} from '../../firebaseInit';

import { useEffect, useRef, useState } from "react";
import { collection, doc,setDoc, getDocs , addDoc,add} from "firebase/firestore";



const ImageList = (props) => {
    const [imageForm,setImageForm] = useState(false);
    const [imageListArr,setImageListArr] = useState([]);
  
    const titleRef = useRef();
    const urlRef = useRef();
    
    
    // firebase methods
    


    const {handleImageList, id} = props;
    
    const getImageList = async() => {
      const querySnapshot = await getDocs(collection(db,"albums",id,"images"));
      const imageArr= querySnapshot.docs.map((doc) => {
            return {
               id:doc.id,
               ...doc.data()
            }
       });

       setImageListArr(imageArr);    
    }
    useEffect(() => {
          getImageList();
    },[imageListArr])

    const addImage = async(e) => {
        e.preventDefault();
     
        if(titleRef.current.value.length && urlRef.current.value.length) {
         

           const imgRef = await addDoc(collection(db,"albums",id,"images"),{
               title:titleRef.current.value,
               urlLink:urlRef.current.value
           })
          
          
            
          
     }
     console.log(imageListArr);
      titleRef.current.value = "";
      urlRef.current.value = "";
    }
 
    const clearInput = (e) => {
        e.preventDefault();
        titleRef.current.value = "";
        urlRef.current.value = "";
    }
  const handleImageForm = () => {
      setImageForm(!imageForm);
      if(!imageForm) {
        let album = document.getElementById('addImage');
   
        album.style.backgroundColor = "rgba(255,19,0,.1)";
        album.style.border = "2px solid #ff1300";
        album.style.color = "#ff1300";
        album.innerText =  "Cancel";
   }
   else{
        let album = document.getElementById('addImage');
   
        album.style.backgroundColor = "rgba(173, 216, 230, 0.596)";
        album.style.border = "2px solid rgb(21, 164, 212)";
        album.style.color = "rgb(14, 89, 238)";
        album.innerText =  "Add Image";
   }
  }
   
  const handleCarouselImage = () => {
      
  }
  return (
    <>
      {imageForm ? <ImageForm addImage = {addImage} clearInput = {clearInput}
         titleRef = {titleRef}
         urlRef = {urlRef}
      /> : null }
      
      <div className={styles.AlbumImageCont} id = 'albumImageCont'>
        <div className={styles.imageIconCont}>
          <div className={styles.backIcon} onClick={(e) => handleImageList(e)}>
            <img src={back} alt="back icon" />
          </div>
          <div className={styles.imageListTitle}>
            No images found in the album.
          </div>
          <div className={styles.imageSearchIcon}>
            <img src={search} alt="search icon" />
          </div>
          <div className={styles.imageButton}>
            <button onClick={handleImageForm} id = 'addImage'>Add image</button>
          </div>
        </div>
        <div className={styles.imageListCont}>
          
            {
              imageListArr.map((img) =>(
                <div className={styles.imageCont} key={img.id}>
            <div className={styles.imgCont}>
              <img
                src={img.urlLink}
                alt="album-image"
              />
            </div>
            <div className={styles.imgNameCont}>{img.title}</div>
            <div className={styles.imageEditCont}>
              <img src={edit} className={styles.editImg} alt="edit-image" />
              <img src={dlt} className={styles.dltImg} alt="delete-image" />
            </div>
          </div>
              ))
            }
         
        </div>
      </div>
         
     
      
     
        
          
        
      
      
    </>
  );
};

export default ImageList;
