import React, {useState } from 'react'
import './Carousel.css'
import I1 from './CarouselImages/image1.png'
import I2 from './CarouselImages/image2.png'
import I3 from './CarouselImages/image3.png'
import I4 from './CarouselImages/image4.png'
import I5 from './CarouselImages/image5.png'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const Carousel = () => {
    const images = [I1 , I2 , I3 , I4 , I5]
    const linkSa = ['1' , '2' ,'3' ,'4' ,'5']
    const [Index , setIndex] = useState(0)
    // useEffect(()=>{
    //     setTimeout(() => {
    //         return(
    //             Index < 4 ? setIndex(Index + 1) : setIndex(0)
    //         )
    //     }, 1000);
    // },[Index])
  return (
    <div className='CarouselWrapper  w-[100%] md:h-[28rem]  overflow-hidden   '>
       <Splide options ={ {
    type         : 'loop',
    gap          : '1rem',
    autoplay     : true,
    pauseOnHover : false,
    resetProgress: false,
    width        : '100%',
    height       : '100%',
  }} className='w-[100%]  flex justify-center items-center  ' aria-label="My Favorite Images">

{
    images.map((image , index)=>{
        return(
            <SplideSlide>
                <a href={linkSa[index]}>
                <img src={image}  alt="" className='object-cover CarouselImage'/>
                </a>
            </SplideSlide>
        )
    })
}
</Splide>
    </div>
  )
}

export default Carousel
