import { AiFillStar } from "react-icons/ai"
import { FaRegHeart } from "react-icons/fa"
import CarouselCast from "./CarouselCast"

const DetailPages = (props) => {
    const {
        vote_average,
        popularity,
        name,
        duration,
        releaseDate,
        genres,
        overview,
        topCast,
        notFound
    } = props
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    <div className="flex items-center">
                        <AiFillStar className="text-[#FFC319]" size={24} />
                        <p className="ml-1 text-xl font-bold">{parseFloat(vote_average).toFixed(1)}</p>
                    </div>
                    <div className="h-4 w-[2px] bg-gray-600"></div>
                    <p className="text-sm">{parseFloat(popularity).toFixed(0)}</p>
                </div>
                <div>
                    <FaRegHeart size={25} />
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-4xl">
                    {name}
                </h3>
                <div className="text-xs flex flex-wrap items-center justify-start gap-2 mt-3">
                    <span className="tag-bullet">{duration}</span>
                    <span className="tag-bullet">{releaseDate}</span>
                    <span className="tag-bullet">{genres}</span>
                </div>
                <div className="mt-6">
                    <p className="text-sm leading-relaxed">{overview}</p>
                </div>
                <div className="mt-5">
                    <h3 className="mb-3">Top Cast</h3>
                    {topCast.length > 0 ?
                        <CarouselCast topCast={topCast} />
                        :
                        <h3 className="text-center">Caster not found</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailPages