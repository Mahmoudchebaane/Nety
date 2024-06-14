import { Carousel } from 'react-bootstrap';
import { useRouter } from "next/router";
import ProductDetails from '../pages/productDetails/[productId]';
export default function TopPack() {
    const router = useRouter();
    const handelChangeDetail = () => {
        router.push("productDetails/" + 122);
      };
  return (
    <>
      <div>
        <img src="/image/top-pack.png" className="card-img-top" alt="..." />
      </div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/slide5.png"
            alt="Deuxième slide"
          />
          
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/slide6.png"
            alt="Troisième slide"
          />
          <Carousel.Caption>
            <button className='btn btn-primary' onClick={() => handelChangeDetail()}>Découvrir</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
    </>
  );
}
