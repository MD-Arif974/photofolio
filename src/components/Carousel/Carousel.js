import styles from './Carousel.module.css';
import prev from '../../images/back (1).png';
import next from '../../images/next (1).png';
import remove from '../../images/x.png';



const Carousel = () => {
        return(
            <>
               <div className={styles.carouselCont}>
                 <div className={styles.prevCont}>
                    <img src={prev} alt='prev-image' />
                 </div>
                 <div className={styles.carouselImgCont}>
                    <img src='https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg' alt='prev-image' />
                 </div>
                 <div className={styles.nextCont}>
                    <img src={next} alt='prev-image' />
                 </div>
                 <div className={styles.removeCont}>
                      <img src={remove} alt='prev-image' />
                 </div>
               </div>
            </>
        )
}

export default Carousel;