import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function ProductSlider({ images, title }: { images: string[], title: string }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  console.log(images);
  return (
    <div className="slider-container w-full!">
      <Slider {...settings}>
        {images.map(img => <img key={img} className="w-full h-96 object-cover" src={img} alt={title} />)}
      </Slider>
    </div>
  );
}

