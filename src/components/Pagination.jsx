import ReactPaginate from 'react-paginate'

const Pagination = ({ pageCount, onPageChange, forcePage }) => {
    return (
        <ReactPaginate
            className='flex items-center justify-between mt-5 text-sm'
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            containerClassName="pagination"
            activeClassName="px-4 py-2 bg-primary bg-active rounded-lg"
            onPageChange={onPageChange}
            forcePage={forcePage - 1}
        />
    )
}

export default Pagination