import Link from "next/link"
import { LuSearch } from "react-icons/lu"

const Header = () => {
  return (
    <header className="bg-dark p-4 fixed top-0 w-full z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Filmku</h1>
        <Link href="/search" className="bg-primary p-4 rounded-md">
          <LuSearch size={20} />
        </Link>
      </div>
    </header>
  )
}

export default Header