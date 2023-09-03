import CardList from "@/components/CardList"
import CardModal from "@/components/CardModal"
import Layout from "@/components/layouts/Index"
import { api_key, img_500 } from "@/config/config"
import axios from "axios"
import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import Loading from "@/components/Loading"

const TrendingTv = () => {
  const [allTvTrending, setAllTvTrending] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [getIdTv, setGetIdTv] = useState(null)
  const [dataModalTv, setDataModalTv] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getAllTvTrending = async () => {
    try {
      const { data } = await axios.get(`
        https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}&page=${currentPage}`)
      setIsLoading(false)
      setAllTvTrending(data)
      console.log(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getAllTvTrending()
  }, [currentPage])

  const openModal = async (TvId) => {
    setGetIdTv(TvId)
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${TvId}?api_key=${api_key}`
      )
      setDataModalTv(data)
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
      <h1 className="mb-5">All Trending TV Series</h1>
      <div className="grid grid-cols-2 gap-4">
        {allTvTrending.results?.map((item, index) => (
          <CardList
            key={index}
            image={item.poster_path ? `${img_500}${item.poster_path}` : imgUnavailable}
            alt="tvseries image"
            rating={item.vote_average}
            onClick={() => openModal(item.id)}
          />
        ))}
      </div>
      <CardModal
        src={`${img_500}${dataModalTv.backdrop_path}`}
        alt="tvseries image"
        title={dataModalTv.name}
        overview={dataModalTv.overview}
        show={isOpenModal}
        onClose={closeModal}
        route={`/trending-tv/${getIdTv}`}
      />
      <Pagination
        onPageChange={handlePageClick}
        pageCount={8}
        forcePage={currentPage}
      />
    </Layout>
  )
}

export default TrendingTv