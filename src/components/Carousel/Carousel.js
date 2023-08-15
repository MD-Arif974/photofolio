import styles from './Carousel.module.css';
import prev from '../../images/back (1).png';
import next from '../../images/next (1).png';
import remove from '../../images/x.png';


import { useEffect } from 'react';

const Carousel = ({handlePrev, handleNext,handleCancel, urlImg}) => {
    

        return(
            <>
               <div className={styles.carouselCont}  id = 'carouselCont'>
                 <div className={styles.prevCont} onClick={handlePrev}>
                    <img src={prev} alt='prev-image' />
                 </div>
                 <div className={styles.carouselImgCont}>
                    <img src={urlImg} alt='prev-image' />
                 </div>
                 <div className={styles.nextCont} onClick={handleNext}>
                    <img src={next} alt='prev-image' />
                 </div>
                 <div className={styles.removeCont} onClick={handleCancel}>
                      <img src={remove} alt='prev-image' />
                 </div>
               </div>
            </>
        )
}

export default Carousel;