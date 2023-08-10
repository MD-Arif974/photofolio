import styles from './AlbumForm.module.css';

const AlbumForm = () => {

    return(
        <>
           <div className={styles.albumForm}>
               <h2>Create an album</h2>
               <form>
                   <input type="text" required placeholder='Album Name'/>
                   <button id={styles.clear}>Clear</button>
                   <button id = {styles.create}>Create</button>
               </form>
           </div>
        </>
    )
}

export default AlbumForm;