import Link from "next/link"
import { FaFireAlt, FaRegHeart } from "react-icons/fa"
import { RiMovie2Line } from "react-icons/ri"
import { PiTelevisionSimpleBold } from "react-icons/pi"
import { useRouter } from "next/router"

const Navigation = () => {
  const router = useRouter()
  const menuList = [
    {
      title: "Trending",
      icon: <FaFireAlt size={20} />,
      path: "/"
    },
    {
      title: "All Movies",
      icon: <RiMovie2Line size={20} />,
      path: "/all-movies"
    },
    {
      title: "TV Series",
      icon: <PiTelevisionSimpleBold size={20} />,
      path: "/all-tvseries"
    },
    {
      title: "Likes",
      icon: <FaRegHeart size={20} />,
      path: "#"
    },
  ]

  return (
    <nav className="fixed z-30 bottom-0 inset-x-0 w-full p-5 bg-dark">
      <ul className="flex items-center justify-between">
        {menuList.map((item, index) => (
          <Link key={index} href={item.path} className={`flex flex-col items-center text-white ${router.pathname === item.path ? "bg-primary p-3 rounded-lg" : ""}`}>
            {item.icon}
            <div className="text-xs mt-1 font-normal">{item.title}</div>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation