import CardList from "@/components/CardList"
import Loading from "@/components/Loading"
import Layout from "@/components/layouts/Index"
import { api_key, img_500 } from "@/config/config"
import axios from "axios"
import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import CardModal from "@/components/CardModal"
import imgUnavailable from "@/images/poster-holder.jpg"

const AllTvSeries = () => {
    const [allTvSeries, setAllTvSeries] = useState([])
    const [openModalTv, setOpenModalTv] = useState([])

    const [selectedTv, setSelectedTv] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const [pageNotFound, setPageNotFound] = useState(false)

    const getAllTvSeries = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&page=${currentPage}`)
            setLoading(false)

            if (data.results.length > 0) {
                setPageNotFound(false)
            }
            setAllTvSeries(data.results)
            setTotalPages(data.total_pages)
        } catch (error) {
            if (error.response.status === 422) {
                setPageNotFound(true)
            }
        }
    }

    useEffect(() => {
        getAllTvSeries()
    }, [currentPage])

    const openModal = async (movieId) => {
        setSelectedTv(movieId)
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/tv/${movieId}?api_key=${api_key}`
            )
            setOpenModalTv(data)
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
            <h1 className="mb-5">All TV Series</h1>
            {pageNotFound ? (
                <h3 className="h-[50vh] flex items-center justify-center">data not found</h3>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {allTvSeries.map((item, index) => (
                        <CardList
                            key={index}
                            image={item.poster_path ? `${img_500}${item.poster_path}` : imgUnavailable}
                            alt="tv-series image"
                            rating={item.vote_average}
                            onClick={() => openModal(item.id)}
                        />
                    ))}
                </div>
            )}
            <CardModal
                src={`${img_500}${openModalTv.backdrop_path}`}
                alt="tv-series image"
                title={openModalTv.name}
                overview={openModalTv.overview}
                show={isOpenModal}
                onClose={closeModal}
                route={`/all-tvseries/${selectedTv}`}
            />

            <Pagination onPageChange={handlePageClick} pageCount={totalPages} forcePage={currentPage} />
        </Layout>
    )
}

export default AllTvSeries