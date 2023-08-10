import styles from "./ImageList.module.css";
import back from "../../images/back.png";
import search from "../../images/search.png";
import edit from '../../images/edit.png';
import dlt from '../../images/delete.png';

const ImageList = () => {
  return (
    <>
      <div className={styles.AlbumImageCont}>
        <div className={styles.imageIconCont}>
          <div className={styles.backIcon}>
            <img src={back} alt="back icon" />
          </div>
          <div className={styles.imageListTitle}>
            No images found in the album.
          </div>
          <div className={styles.imageSearchIcon}>
            <img src={search} alt="search icon" />
          </div>
          <div className={styles.imageButton}>
            <button>Add image</button>
          </div>
        </div>
        <div className={styles.imageListCont}>
          <div className={styles.imageCont}>
            <div className={styles.imgCont}>
              <img
                src="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg"
                alt="album-image"
              />
            </div>
            <div className={styles.imgNameCont}>Arif</div>
            <div className={styles.imageEditCont}>
              <img src={edit} className={styles.editImg} alt="edit-image" />
              <img src={dlt} className={styles.dltImg} alt="delete-image" />
            </div>
          </div>
          <div className={styles.imageCont}>
            <div className={styles.imgCont}>
              <img
                src="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg"
                alt="album-image"
              />
            </div>
            <div className={styles.imgNameCont}>Arif</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageList;
