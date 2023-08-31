import CardList from "@/components/CardList"
import Loading from "@/components/Loading"
import Layout from "@/components/layouts/Index"
import { api_key, img_500 } from "@/config/config"
import axios from "axios"
import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import CardModal from "@/components/CardModal"

const AllMovies = () => {
  const [allMovies, setAllMovies] = useState([])
  const [openModalMovie, setOpenModalMovie] = useState([])

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const [pageNotFound, setPageNotFound] = useState(false)

  const getAllDiscoverMovie = async () => {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${currentPage}`)
      setLoading(false)

      if (data.results.length > 0) {
        setPageNotFound(false)
      }
      setAllMovies(data.results)
      setTotalPages(data.total_pages)
    } catch (error) {
      if (error.response.status === 422) {
        setPageNotFound(true)
      }
    }
  }

  useEffect(() => {
    getAllDiscoverMovie()
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

  if (loading) {
    return <Loading />
  }

  return (
    <Layout>
      <h1 className="mb-5">All Movie List</h1>
      {pageNotFound ? (
        <h3 className="h-[50vh] flex items-center justify-center">data not found</h3>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {allMovies.map((item, index) => (
            <CardList
              key={index}
              image={item.poster_path ? `${img_500}${item.poster_path}` : imgUnavailable}
              alt="all movies image"
              rating={item.vote_average}
              onClick={() => openModal(item.id)}
            />
          ))}
        </div>
      )}
      <CardModal
        src={`${img_500}${openModalMovie.backdrop_path}`}
        title={openModalMovie.title}
        overview={openModalMovie.overview}
        show={isOpenModal}
        onClose={closeModal}
        route={`/all-movies/${selectedMovie}`}
      />

      <Pagination onPageChange={handlePageClick} pageCount={totalPages} forcePage={currentPage} />
    </Layout>
  )
}

export default AllMovies