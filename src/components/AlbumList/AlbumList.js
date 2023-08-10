import styles from './albumlist.module.css';
import albumPic from '../../images/photos.png';
import AlbumForm from '../AlbumForm/AlbumForm';
import ImageList from '../ImageList/ImageList';
import ImageForm from '../ImageForm/ImageForm';
import Carousel from '../Carousel/Carousel';

const AlbumList = () => {

    return(
         <>
            {/* <AlbumForm /> */}
            {/* <ImageForm /> */}
            {/* <ImageList /> */}
            <Carousel />
           <div className={styles.album}>
             <div className= {styles.albumHeading}>
                <h2>Your Albums</h2>
                <button>Add Album</button>
             </div>
             <div className={styles.albumList}>
                  <div className={styles.innerList}>
                   <div className={styles.albumCont}><img src={albumPic}  alt='album-name'/></div>
                   <div className={styles.albumTitle}><span>Arif</span></div>
                   
                  </div>
                  <div className={styles.innerList}>
                   <div className={styles.albumCont}><img src={albumPic}  alt='album-name'/></div>
                   <div className={styles.albumTitle}><span>Arif</span></div>
                   
                  </div>
                  <div className={styles.innerList}>
                   <div className={styles.albumCont}><img src={albumPic}  alt='album-name'/></div>
                   <div className={styles.albumTitle}><span>Arif</span></div>
                   
                  </div>
                  
             </div>
                
           </div>
         </>
    )
}

export default AlbumList;