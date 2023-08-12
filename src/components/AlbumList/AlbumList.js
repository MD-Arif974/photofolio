import styles from "./albumlist.module.css";
import albumPic from "../../images/photos.png";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import ImageForm from "../ImageForm/ImageForm";
import Carousel from "../Carousel/Carousel";
import { useState, useRef, useEffect } from "react";

import {db} from '../../firebaseInit';


// import Firestore methods

import { collection, addDoc, getDocs } from "firebase/firestore";

const AlbumList = ({}) => {
  const [albumForm, setAlbumForm] = useState(false);
  const [imageList, setImageList] = useState(false);
  const [albumArr, setAlbumArr] = useState([]);
  const [id,setId] = useState(null);

  const inputRef = useRef();


  
   const getAlbum = async() => {
       const querySnapshot = await getDocs(collection(db,"albums"));
      const albumArr= querySnapshot.docs.map((doc) => {
            return {
               id:doc.id,
               ...doc.data()
            }
       });

       setAlbumArr(albumArr);
   }
   useEffect(() => {
      getAlbum()
   },[albumArr])
  
  const AddAlbum = async(data, e) => {
    e.preventDefault();
    if(data.current.value.length) {
         const docRef = await addDoc(collection(db,"albums"),{
             albumName:data.current.value
         })
           const obj = {
               id:docRef.id,
               albumName:data.current.value
           }
     //     setAlbumArr([obj, ...albumArr]);
         
    }
   
    data.current.value = "";
  };

  const handleAlbumForm = () => {
    setAlbumForm(!albumForm);
    if (!albumForm) {
      let album = document.getElementById("addAlbum");

      album.style.backgroundColor = "rgba(255,19,0,.1)";
      album.style.border = "2px solid #ff1300";
      album.style.color = "#ff1300";
      album.innerText = "Cancel";
    } else {
      let album = document.getElementById("addAlbum");

      album.style.backgroundColor = "rgba(173, 216, 230, 0.596)";
      album.style.border = "2px solid rgb(21, 164, 212)";
      album.style.color = "rgb(14, 89, 238)";
      album.innerText = "Add album";
    }
  };

  const handleImageList = (e,id) => {
     e.preventDefault();
    setImageList(!imageList);
    setId(id)
    
  };


  const clearInput = (data,e) => {
       e.preventDefault();
       data.current.value = "";
  }
  return (
    <>
      {albumForm ? (
        <AlbumForm inputRef={inputRef} AddAlbum={AddAlbum}  clearInput = {clearInput}/>
      ) : null}
      {/* <ImageForm /> */}
      {imageList ? (
        <ImageList handleImageList={handleImageList} albumArr = {albumArr} id = {id}  />
      ) : (
        <>
          <div className={styles.album}>
            <div className={styles.albumHeading}>
              <h2>Your Albums</h2>
              <button onClick={handleAlbumForm} id="addAlbum">
                Add Album
              </button>
            </div>

            <div className={styles.albumList}>
              {albumArr.map((album, i) => (
                <div
                  className={styles.innerList}
                  onClick={(e) => handleImageList(e,album.id)}
                  key={i}
                >
                  <div className={styles.albumCont}>
                    <img src={albumPic} alt="album-name" />
                  </div>
                  <div className={styles.albumTitle}>
                    <span>
                      {album.albumName}
                      
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {/* <Carousel /> */}
    </>
  );
};

export default AlbumList;
