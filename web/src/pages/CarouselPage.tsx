import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const imagenes = [
  'acantilados__guethary_.jpg',
  'anna_escher_von_muralt.jpg',
  'cartel__amalia_de_llano_y_dotres__condesa_de_vilches_.jpg',
  'cartel__chicos_en_la_playa_.jpg',
  'cartel__cristo_crucificado_.jpg',
];

function CarouselPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen font-montserrat bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">🖼️ Galería de Obras</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-96 h-96 rounded-2xl shadow-xl"
      >
        {imagenes.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`http://localhost:3000/public/imagenes/${img}`}
              alt={img}
              className="w-full h-full object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarouselPage;