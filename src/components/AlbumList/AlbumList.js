import styles from "./albumlist.module.css";
import albumPic from "../../images/photos.png";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import edit from "../../images/edit.png";
import dlt from "../../images/delete.png";
import ImageForm from "../ImageForm/ImageForm";
import Carousel from "../Carousel/Carousel";
import { useState, useRef, useEffect } from "react";

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

  const inputRef = useRef();

  const getAlbum = async () => {
    const querySnapshot = await getDocs(collection(db, "albums"));
    const albumArr = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAlbumArr(albumArr);
  };

  useEffect(() => {
    getAlbum();
  }, [albumLoading]);

  const handleImageList = (e, id, album) => {
    e.preventDefault();
    setImageList(!imageList);
    setId(id);
    setAlbumName(album);
    setAlbumForm(false);
  };

  const handleAlbumForm = () => {};

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
    data.current.value = "";
  };

  // clear album form
  const clearInput = (data, e) => {
    e.preventDefault();
    data.current.value = "";
  };
  return (
    <>
      {albumForm ? (
        <AlbumForm
          inputRef={inputRef}
          AddAlbum={AddAlbum}
          clearInput={clearInput}
        />
      ) : null}
      {/* <ImageForm /> */}
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
      {/* <Carousel /> */}
    </>
  );
};

export default AlbumList;
