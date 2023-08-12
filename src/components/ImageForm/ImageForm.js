import styles from './ImageForm.module.css';



const ImageForm = ({addImage,clearInput, titleRef, urlRef}) => {
    return(
        <>
           <div className={styles.imageForm}>
            <div className={styles.imageFormTitle}>
                Add image to HAY
            </div>
            <form>
               <input type='text' className = {styles.imageTitle} ref={titleRef}  required placeholder='Title' />
               <input type='text' className = {styles.imageUrl} ref={urlRef} required placeholder='Image URL' />
               <button id = {styles.imgFormClear} onClick={(e) => clearInput(e)}>Clear</button>
               <button id = {styles.imgFormAdd} onClick={(e) => addImage(e)}>Add</button>
            </form>
           
           </div>
        </>
    )
}


export default ImageForm;