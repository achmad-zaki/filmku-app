import { LuSearch } from "react-icons/lu"

const Header = () => {
  return (
    <header className="bg-dark p-4 fixed top-0 w-full z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Filmku</h1>
        <button className="bg-primary p-4 rounded-md">
          <LuSearch size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header