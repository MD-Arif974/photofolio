import styles from "./albumlist.module.css";
import albumPic from "../../images/photos.png";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";

import { useState, useRef, useEffect } from "react";

import Spinner from 'react-spinner-material';

import { toast } from "react-toastify";

import { db } from "../../firebaseInit";

// import Firestore methods
import { getDocs, collection, addDoc } from "firebase/firestore";

const AlbumList = ({}) => {
  const [albumForm, setAlbumForm] = useState(false);
  const [albumArr, setAlbumArr] = useState([]);
  const [albumLoading, setAlbumLoading] = useState(false);
  const [imageList, setImageList] = useState(false);
  const [id, setId] = useState(null);
  const [albumName, setAlbumName] = useState({});
  const [albumHoverIndex, setAlbumHoverIndex] = useState(null);
  const [loading,setLoading] = useState(false);

  const inputRef = useRef();

   // Get all documents initially
  const getAlbum = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "albums"));
    const albumArr = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAlbumArr(albumArr);
    setLoading(false);
  };

  useEffect(() => {
      getAlbum();
  }, [albumLoading]);

   // handleImageList is to change the state
  const handleImageList = (e, id, album) => {
    e.preventDefault();
    setImageList(!imageList);
    setId(id);
    setAlbumName(album);
    setAlbumForm(false);
  };

 
  // addalbum func is to add documents to firebase
  const AddAlbum = async (data, e) => {
    e.preventDefault();
    setAlbumLoading(true);
    if (data.current.value.length === 0) {
      alert("Please enter data");
    } else {
      const docRef = await addDoc(collection(db, "albums"), {
        albumName: data.current.value,
      });
    }

    setAlbumLoading(false);
    toast.success("Album Added Successfully!!");
    if(data.current) data.current.value = "";
  };

  // clear album form
  const clearInput = (data, e) => {
    e.preventDefault();
    data.current.value = "";
  };

  if(loading) {
    return (
      <div className={styles.loader}>
         <Spinner color="#0077ff" />
    </div>
    );
  }
  return (
    <>
     
      {albumForm ? (
        <AlbumForm
          inputRef={inputRef}
          AddAlbum={AddAlbum}
          clearInput={clearInput}
        />
      ) : null}
     
      {imageList ? (
        <ImageList
          handleImageList={handleImageList}
          albumArr={albumArr}
          id={id}
          album={albumName}
        />
      ) : (
        <>
          <div className={styles.album}>
            <div className={styles.albumHeading}>
              <h2>Your Albums</h2>
              <button
                onClick={() => setAlbumForm(!albumForm)}
                className={
                  albumForm ? styles.albumCancelButton : styles.albumAddButton
                }
              >
                {albumForm ? "Cancel" : "Add album"}
              </button>
            </div>

            <div className={styles.albumList}>
              {albumArr.map((album, i) => (
               
                  <div
                    className={styles.innerList}
                    onClick={(e) => handleImageList(e, album.id, album)}
                    key={album.id}
                    onMouseOver={() => setAlbumHoverIndex(i)}
                    onMouseLeave={() => setAlbumHoverIndex(null)}
                  >
                    <div className={styles.albumCont}>
                      <img src={albumPic} alt="album-name" />
                    </div>
                    <div className={styles.albumTitle}>
                      <span>{album.albumName}</span>
                    </div>
                    
                  </div>
                
              ))}
            </div>
          </div>
        </>
      )}
     
    </>
  );
};

export default AlbumList;
