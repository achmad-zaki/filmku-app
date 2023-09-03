import Link from "next/link"
import Carousel from "@/components/Carousel";
import Layout from "@/components/layouts/Index";
import axios from "axios";
import { api_key } from "@/config/config";
import { useEffect, useState } from "react";

const Home = () => {
  const [moviesTrending, setMoviesTrending] = useState([])
  const [tvPopular, setTvPopular] = useState([])
  const [isLoading, setIsLoading] = useState(true)

    const getMoviesTrending = async () => {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`)
        setMoviesTrending(data.results)
      } catch (err) {
        console.log(err.message)
      }
    }

    const getTvPopular = async () => {
      try {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}`)
        setTvPopular(data.results)
      } catch (err) {
        console.log(err.message)
      }
    }
    
  useEffect(() => {
    getMoviesTrending()
    getTvPopular()
  }, [])

  console.log(tvPopular)

  const Loading = () => {
    return <h3 className="text-lg">Loading ...</h3>
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-base">Trending Movies</h1>
        <Link href="/trending-movies" className="text-xs tracking-[0.2px]">See more</Link>
      </div>
      <Carousel movies={moviesTrending} />

      <div className="flex justify-between items-center my-5">
        <h1 className="text-base">Trending TV Series</h1>
        <Link href="/trending-tv" className="text-xs tracking-[0.2px]">See more</Link>
      </div>
      <Carousel movies={tvPopular} />
    </Layout>
  )
}

export default Home