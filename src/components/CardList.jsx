import Image from "next/image"
import { AiFillStar } from "react-icons/ai"

const CardList = (props) => {
  const { 
    onClick, 
    image, 
    rating, 
    alt 
  } = props
  
  return (
    <>
      <div onClick={onClick} className={`h-[250px] rounded-lg overflow-hidden relative cursor-pointer`}>
        <Image
          width={500}
          height={500}
          priority
          className="hover:scale-105 transition duration-300 h-full w-full object-cover object-center rounded-lg"
          src={image}
          alt={alt}
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md w-12 h-6 rounded-md text-sm flex items-center justify-evenly text-[#FF8700]">
          <AiFillStar className="text-[#FFC319]" size={15} />
          {parseFloat(rating).toFixed(1)}
        </div>
      </div>
    </>
  )
}

export default CardList