import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules'
import 'swiper/css';
import Image from "next/image";
import { img_500 } from "@/config/config";
import imgUnavailable from "@/images/poster-holder.jpg"

const CarouselCast = ({ topCast }) => {
    return (
        <Swiper
            modules={[ Autoplay ]}
            spaceBetween={10}
            slidesPerView={3}
            autoplay={{ delay: 1000 }}
        >
            {topCast.map((item, index) => (
                <SwiperSlide
                    key={index}
                >
                    <div className="flex flex-col justify-center items-center">
                        <Image className="grayscale w-24 h-24 rounded-full object-cover object-center" width={500} height={500} src={item.profile_path ? `${img_500}${item.profile_path}` : imgUnavailable} alt="" />
                        <p className="mt-2 text-xs text-center">{item.original_name}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default CarouselCast