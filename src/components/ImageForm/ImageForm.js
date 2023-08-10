import styles from './ImageForm.module.css';



const ImageForm = () => {
    return(
        <>
           <div className={styles.imageForm}>
            <div className={styles.imageFormTitle}>
                Add image to HAY
            </div>
            <form>
               <input type='text' className = {styles.imageTitle} required placeholder='Title' />
               <input type='text' className = {styles.imageUrl} required placeholder='Image URL' />
               <button id = {styles.imgFormClear}>Clear</button>
               <button id = {styles.imgFormAdd}>Add</button>
            </form>
           
           </div>
        </>
    )
}


export default ImageForm;