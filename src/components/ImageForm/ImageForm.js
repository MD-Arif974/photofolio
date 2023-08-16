import { useEffect } from 'react';
import styles from './ImageForm.module.css';
import AlbumForm from '../AlbumForm/AlbumForm';




const ImageForm = ({addImage,clearImageInput, titleRef, urlRef,imageForm,imgFormData,
  imgToUpdate, album
}) => {

  
  
    useEffect(() => {
        
        if(!imgToUpdate) {
            
            return;
        };

        if(Object.keys(imgFormData).length > 0) {
            titleRef.current.value = imgFormData.title;
            urlRef.current.value = imgFormData.urlLink;
        }
       
       

        
    },[])
    return(
        <>
           <div className={styles.imageForm}>
            <div className={styles.imageFormTitle}>
               {imgToUpdate ? `Update image ${imgFormData.title}` : `Add image to ${album.albumName}`}
            </div>
            <form>
               <input type='text' className = {styles.imageTitle} ref={titleRef}   required placeholder='Title' />
               <input type='text' className = {styles.imageUrl} ref={urlRef}  required placeholder='Image URL' />
               <button id = {styles.imgFormClear} onClick={(e) => clearImageInput(e)}>Clear</button>
               <button id = {styles.imgFormAdd} onClick={(e) => addImage(e)}>{imgToUpdate ? "Update" : "Add"}</button>
            </form>
           
           </div>
        </>
    )
}


export default ImageForm;