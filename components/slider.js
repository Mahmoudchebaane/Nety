import { Carousel } from 'react-bootstrap';

export default function Slider() {
    
  return (
    <>
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/image/slider1.png"
        alt="Premier slide"
      />
      <Carousel.Caption>
        <h3>Premier slide</h3>
        <p>Description du premier slide...</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/image/fille.png"
        alt="Deuxième slide"
      />
      <Carousel.Caption>
        <h3>Deuxième slide</h3>
        <p>Description du deuxième slide...</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/image/slider1.png"
        alt="Troisième slide"
      />
      <Carousel.Caption>
        <h3>Troisième slide</h3>
        <p>Description du troisième slide...</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
     
    </>
  );
}
