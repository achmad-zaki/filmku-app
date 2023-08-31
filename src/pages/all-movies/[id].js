import DetailPages from "@/components/DetailPages"
import Loading from "@/components/Loading"
import { api_key, img_original } from "@/config/config"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa"
import { LuSearch } from "react-icons/lu"
import { MdOutlineNavigateBefore } from "react-icons/md"
import YouTube from 'react-youtube'

const AllMoviesDetail = () => {
  const [movieDetail, setMovieDetail] = useState([])
  const [genres, setGenres] = useState([])
  const [releaseDate, setReleaseDate] = useState([])
  const [topCast, setTopCast] = useState([])
  const [movieVideos, setMovieVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [playVideo, setPlayVideo] = useState(false)
  const { query } = useRouter()
  const movieId = parseInt(query.id)

  const getMovieDetail = async () => {
    if (movieId) {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=videos,credits`)
        const {
          genres,
          release_date,
          videos,
          credits
        } = data

        setLoading(false)
        setGenres(genres.map((item) => item.name).slice(0, 3).join(', '))
        setReleaseDate(release_date.slice(0, 4))
        setMovieVideos(videos.results[0].key)
        setMovieDetail(data)
        setTopCast(credits.cast)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getMovieDetail()
  }, [movieId])

  const hour = Math.floor(movieDetail.runtime / 60)
  const minute = movieDetail.runtime % 60

  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  if (loading) {
    return <Loading />
  }

  return (
    <section>
      <>
        {playVideo ?
          <YouTube videoId={movieVideos} opts={opts} onEnd={() => setPlayVideo(false)} />
          :
          <div className="relative">
            <Image
              width={700}
              height={700}
              className="object-cover object-center w-full"
              src={`${img_original}${movieDetail.backdrop_path}`}
              alt="movie poster"
              priority
            />
            <div className="absolute bg-gradient-to-b from-dark/5 to-dark bottom-0 left-0 w-full h-full z-10"></div>
            <div className=" px-4 absolute z-50 w-full top-5 flex items-center justify-between">
              <Link href="/trending-movies">
                <MdOutlineNavigateBefore size={30} />
              </Link>
              <Link href="">
                <LuSearch size={25} />
              </Link>
            </div>
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <button onClick={() => setPlayVideo(true)} className="rounded-full bg-white p-4 z-20"><FaPlay className="text-dark" /></button>
            </div>
          </div>
        }
      </>

      <DetailPages
        vote_average={movieDetail.vote_average}
        popularity={movieDetail.popularity}
        name={movieDetail.title}
        duration={`${hour}h ${minute}m`}
        releaseDate={releaseDate}
        genres={genres}
        overview={movieDetail.overview}
        topCast={topCast}
      />
    </section>
  )
}

export default AllMoviesDetail