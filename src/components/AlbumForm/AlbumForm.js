import { useRef } from 'react';
import styles from './AlbumForm.module.css';

const AlbumForm = ({AddAlbum, inputRef, clearInput}) => {
      

    return(
        <>
           <div className={styles.albumForm}>
               <h2>Create an album</h2>
               <form>
                   <input type="text" ref={inputRef} required placeholder='Album Name'/>
                   <button id={styles.clear} onClick={(e) => clearInput(inputRef,e)}>Clear</button>
                   <button id = {styles.create} onClick={(e) => AddAlbum(inputRef,e)}>Create</button>
               </form>
           </div>
        </>
    )
}

export default AlbumForm;