import CardList from "@/components/CardList"
import InputSearch from "@/components/InputSearch"
import Layout from "@/components/layouts/Index"
import { api_key, img_500 } from "@/config/config"
import { Tab } from "@headlessui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import imgUnavailable from "@/images/poster-holder.jpg"

const Search = () => {
    const [formData, setFormData] = useState("")
    const [movies, setMovies] = useState([])
    const [tvSeries, setTvSeries] = useState([])
    const [activeTab, setActiveTab] = useState("movie")

    const handleSearch = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${activeTab}?query=${formData}&api_key=${api_key}`)
            if (activeTab === "movie") {
                setMovies(data)
            } else if (activeTab === "tv") {
                setTvSeries(data)
            }
            setMovies(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [activeTab])

    return (
        <section className="p-4">
            <InputSearch
                onChange={(e) => setFormData(e.target.value)}
                onClick={handleSearch}
            />
            {/* switch tab */}
            <Tab.Group>
                <Tab.List className="border border-gray-700 p-2 flex items-center justify-between rounded-md gap-x-1">
                    <Tab onClick={() => setActiveTab("movie")} className={`${activeTab === "movie" ? "bg-primary" : ""} p-2 w-1/2 rounded-md`}>Movies</Tab>
                    <Tab onClick={() => setActiveTab("tv")} className={`${activeTab === "tv" ? "bg-primary" : ""} p-2 w-1/2 rounded-md`}>TV Series</Tab>
                </Tab.List>
                    <Tab.Panels className="mt-3">
                        <Tab.Panel className="grid grid-cols-2 gap-4">
                            {movies.results && movies.results.map((item) => (
                                <CardList
                                    key={item.id}
                                    image={item.poster_path ? `${img_500}${item.poster_path}` : imgUnavailable}
                                    alt="movie image"
                                    rating={item.vote_average}
                                // onClick={() => console.log(item.id)}
                                />
                            ))}
                        </Tab.Panel>
                        <Tab.Panel className="grid grid-cols-2 gap-4">
                            {tvSeries.results && tvSeries.results.map((item) => (
                                <CardList
                                    key={item.id}
                                    image={item.poster_path ? `${img_500}${item.poster_path}` : imgUnavailable}
                                    alt="movie image"
                                    rating={item.vote_average}
                                // onClick={() => console.log(item.id)}
                                />
                            ))}
                        </Tab.Panel>
                    </Tab.Panels>
            </Tab.Group>
            {/* end */}
        </section>
    )
}

export default Search