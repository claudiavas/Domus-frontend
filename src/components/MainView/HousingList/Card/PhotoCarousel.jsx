import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PhotoCarousel = () => {
  return (
    <Carousel showThumbs={false}>
      <span>
        <img src="\Casa 1.jfif" alt="Imagen 1" />
      </span>
      <span>
        <img src="\Casa 2.jfif" alt="Imagen 2" />
      </span>
      <span>
        <img src="\Casa 3.jfif" alt="Imagen 2" />
      </span>
    </Carousel>
  );
};

export default PhotoCarousel;