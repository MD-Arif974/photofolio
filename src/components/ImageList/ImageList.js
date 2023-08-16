// Images import
import styles from "./ImageList.module.css";
import back from "../../images/back.png";
import search from "../../images/search.png";
import edit from "../../images/edit.png";
import dlt from "../../images/delete.png";
import xMark from '../../images/x-mark.png';

// Components imported

import ImageForm from "../ImageForm/ImageForm";
import Carousel from "../Carousel/Carousel";
import {toast} from 'react-toastify';

// import db

import { db } from "../../firebaseInit";
import Spinner from 'react-spinner-material';

// import Firestore methods
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// import hooks 
import { useEffect, useRef, useState } from "react";

const ImageList = ({ id, album, handleImageList }) => {
  const [imageForm, setImageForm] = useState(false);
  const [currHoverIndex, setCurrentHoverIndex] = useState(null);
  const [imgFormData, setImgFormData] = useState({});
  const [imgToUpdate, setImgToUpdate] = useState(false);
  const [imageListArr, setImageListArr] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(null);
  const [searchBar,setSearchBar] = useState(false);
  const [value,setValue] = useState('');
  const [loading,setLoading] = useState(false);

  const titleRef = useRef();
  const urlRef = useRef();

 
  // handlePrev func to show prev images in carousel
  const handlePrev = () => {
     if(activeCarouselIndex === 0) return setActiveCarouselIndex(imageListArr.length - 1);
     setActiveCarouselIndex(prev => prev - 1)
  }

   // handleNext func to show next images in carousel
  const handleNext = () => {
    if(activeCarouselIndex === imageListArr.length - 1) return setActiveCarouselIndex(0);
    setActiveCarouselIndex(prev => prev + 1)
  }
  
   // handleCancel func to the carousel
  const handleCancel = () => {
     setActiveCarouselIndex(null);
  }


  // handleSearchbar

  const handleSearchBar = () => {
      setSearchBar(false);
      setValue('');
  }
  
  // getImageList func to get all images documents from firbase
  const getImageList = async (id) => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "albums", id, "images"));
    const imageArr = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setLoading(false);
    setImageListArr(imageArr);
   
  };

  useEffect(() => {
    getImageList(id);
    
  },[imageLoading,imgFormData]);


   // handleEditform func to set the state when we click on edit button
  const handleEditForm = (e, imgData) => {
    e.preventDefault();
  
    setImgToUpdate(true);
    setImageForm(true);
    setImgFormData(imgData);
   
  };
 

  // addImage func is to add  and also update documents on firebase
  const addImage = async (e) => {
    e.preventDefault();
    setImageLoading(true);
   
    if (imgToUpdate) {
     
      const updateRef = doc(db, "albums", id, "images", imgFormData.id);

      await updateDoc(updateRef, {
        title: titleRef.current.value,
        urlLink: urlRef.current.value,
      });

      toast.success("Image Updated Successfully!!");
      setImgFormData({});
      setImageForm(false);
    } else {
     
      if (
        titleRef.current.value.length > 0 &&
        urlRef.current.value.length > 0
      ) {
        const imgRef = await addDoc(collection(db, "albums", id, "images"), {
          title: titleRef.current.value,
          urlLink: urlRef.current.value,
        });
      
      }
      toast.success("Image Added Successfully!!");
     
    }
     
   
    
    if(titleRef.current !== null ) titleRef.current.value = "";
    if(urlRef.current !== null )  urlRef.current.value = "";
    setImageLoading(false);
    
   
  };

  // clearImageInput func to clear the input fields
  const clearImageInput = (e) => {
    e.preventDefault();
    if(titleRef.current !== null) titleRef.current.value = "";
     urlRef.current.value = "";
  };

  // deleteImage func to delete document from firbase
  const deleteImage = async (e, id1, id2) => {
    e.preventDefault();
    setImageLoading(true);
    await deleteDoc(doc(db, "albums", id2, "images", id1));
    toast.success("Image Deleted Successfully!!");
   
  };
  
  // handleAddCancel func to set the state on clicking on add album or cancel button
  const handleAddCancel = (e) => {
        e.preventDefault();
        setImageForm(!imageForm);
        setImgToUpdate(false);
  }
   
  if(loading) {
    return (
      <div className={styles.loader}>
         <Spinner color="#0077ff" />
    </div>
    )
  }

  return (
    <>
    {(activeCarouselIndex || activeCarouselIndex === 0)&& (

      <Carousel 
       urlImg = {imageListArr[activeCarouselIndex].urlLink}
       handlePrev = {handlePrev}
       handleNext = {handleNext}
       handleCancel = {handleCancel}
     />
    )}
     
      {imageForm &&(
        <ImageForm
          addImage={addImage}
          clearImageInput={clearImageInput}
          titleRef={titleRef}
          urlRef={urlRef}
          imageForm={imageForm}
          imgFormData={imgFormData}
          imgToUpdate={imgToUpdate}
          album = {album}
        />
      )}

      <div className={styles.AlbumImageCont} id="albumImageCont">
        <div className={styles.imageIconCont}>
          <div className={styles.backIcon} onClick={(e) => handleImageList(e)}>
            <img src={back} alt="back icon" />
          </div>
          <div className={styles.imageListTitle}>
            {imageListArr.length
              ? `Images in ${album.albumName}`
              : "No images found in the album."}
          </div>
          {searchBar ? <div className= {styles.searchInputCont}>
            <input type="text" placeholder="Search..." 
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <img src = {xMark} alt="clear" onClick={handleSearchBar}/>
          </div> :imageListArr.length ?<div className={styles.imageSearchIcon} onClick={() => setSearchBar(true)}>
            <img src={search} alt="search icon" />
          </div>: null }
        
          <div
            className={
              imageForm ? styles.imageCancelButton : styles.imageAddButton
            }
          >
            <button onClick={(e) => handleAddCancel(e)}
              
            >
              {imageForm ? "Cancel" : "Add image"}
            </button>
          </div>
        </div>
        <div className={styles.imageListCont}>
          {
            imageListArr.filter(item => {
                if(!value) return true;
                if(item.title.includes(value)) return true;
            })
            .map((img, i) => (
              <div
                className={styles.imageCont}
                key={img.id}
                onMouseOver={() => setCurrentHoverIndex(i)}
                onMouseLeave={() => setCurrentHoverIndex(null)}
              
              >
                <div className={styles.imgCont}
                  onClick={() => setActiveCarouselIndex(i)}
                >
                  <img src={img.urlLink} alt="album-pic" />
                </div>
                <div className={styles.imgNameCont}
                  onClick={() => setActiveCarouselIndex(i)}
                >{img.title}</div>
                <div
                  className={`${styles.imageEditCont} ${
                    currHoverIndex === i && styles.active
                  }`}
                >
                  <img
                    src={edit}
                    className={styles.editImg}
                    alt="edit-pic"
                    onClick={(e) => handleEditForm(e, img)}
                    
                  />
                  <img
                    src={dlt}
                    className={styles.dltImg}
                    alt="delete-pic"
                    onClick={(e) => deleteImage(e, img.id, id)}
                  />
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
