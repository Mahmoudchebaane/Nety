import { Carousel } from 'react-bootstrap';

export default function Slider() {
    
  return (
    <>
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/image/slide1.png"
        alt="Premier slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/image/slide2.png"
        alt="Deuxième slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/image/slide3.png"
        alt="Troisième slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/image/slide4.png"
        alt="Troisième slide"
      />
    </Carousel.Item>
  </Carousel>
     
    </>
  );
}
