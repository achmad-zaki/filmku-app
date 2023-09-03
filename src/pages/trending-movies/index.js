import CardList from "@/components/CardList"
import Pagination from "@/components/Pagination"
import { api_key, img_500 } from "@/config/config"
import { useEffect, useState } from "react"
import imgUnavailable from "@/images/poster-holder.jpg"
import CardModal from "@/components/CardModal"
import axios from "axios"
import Layout from "@/components/layouts/Index"
import { LineWobble } from "@uiball/loaders"
import Loading from "@/components/Loading"

const TrendingMovies = () => {
  const [allMoviesTrending, setAllMoviesTrending] = useState([])
  const [openModalMovie, setOpenModalMovie] = useState([])

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const getAllMovieTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&page=${currentPage}`
    )
    setIsLoading(false)
    setAllMoviesTrending(data)
  }

  useEffect(() => {
    getAllMovieTrending()
  }, [currentPage])

  const openModal = async (movieId) => {
    setSelectedMovie(movieId)
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`
      )
      setOpenModalMovie(data)
      setIsOpenModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1)
    window.scrollTo(0, 0)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout>
      <h1 className="mb-5">All Trending Movies</h1>
      <div className="grid grid-cols-2 gap-4">
        {allMoviesTrending.results?.map((item, index) => (
          <CardList
            key={index}
            image={item.poster_path ? `${img_500}${item.poster_path}` : imgUnavailable}
            alt="movie image"
            rating={item.vote_average}
            onClick={() => openModal(item.id)}
          />
        ))}
      </div>
      <CardModal
        src={`${img_500}${openModalMovie.backdrop_path}`}
        alt="movie image"
        title={openModalMovie.title}
        overview={openModalMovie.overview}
        show={isOpenModal}
        onClose={closeModal}
        route={`/trending-movies/${selectedMovie}`}
      />

      <Pagination onPageChange={handlePageClick} pageCount={8} forcePage={currentPage} />
    </Layout>
  )
}

export default TrendingMovies