import { LuSearch } from "react-icons/lu"

const InputSearch = (props) => {
    const {
        onChange,
        onClick
    } = props
    return (
        <div className="flex items-center mb-5">
            <div className="w-full">
                <input onChange={onChange} type="text" className="bg-gray-800 w-full p-3 rounded-md" placeholder="Search Movie or TV Series" />
            </div>
            <button onClick={onClick} type="submit" className="bg-primary p-3 rounded-md ml-3">
                <LuSearch size={25} />
            </button>
        </div>
    )
}

export default InputSearch