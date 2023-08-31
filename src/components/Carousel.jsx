import Image from "next/image"
import { AiFillStar } from "react-icons/ai"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import { img_500 } from "@/config/config";

const CarouselMovie = ({ movies }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
    >
      {movies?.map((item) => (
        <SwiperSlide key={item.id} className="relative">
          <div className="absolute right-2 top-2 text-[#FFC319] bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-xs flex gap-x-1">
            <AiFillStar className="text-[#FFC319]" size={15} />
            {parseFloat(item.vote_average).toFixed(1)}
          </div>
          <Image 
            width={500} 
            height={500} 
            className="h-[250px] object-cover object-center rounded-lg w-full" 
            src={`${img_500}${item.poster_path}`} 
            alt="trending"
            priority />
          <h3 className="font-bold text-sm mt-3">{item.title}</h3>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CarouselMovie