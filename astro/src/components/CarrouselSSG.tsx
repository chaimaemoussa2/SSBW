import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Producto {
  titulo: string;
  imagen: string;
  texto_precio: string;
}

interface Props {
  productos: Producto[];
}

function CarrouselSSG({ productos }: Props) {
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
        {productos.map((p, index) => (
          <SwiperSlide key={index}>
            <img
              src={`/images/${p.imagen}`}
              alt={p.titulo}
              className="w-full h-full object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarrouselSSG;
