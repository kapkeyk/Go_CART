import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './Cart.jsx';
import { CartContext } from '../context/Context.jsx';
import { Rating } from "@material-tailwind/react";
import { HiOutlineShoppingCart } from "react-icons/hi";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(4); // Items to display per page
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const { cartItems, addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const toggle = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filtered items based on search query
  const filteredData = data.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setCurrentPage(1); // Reset pagination to first page when performing a search
    setSearchQuery(event.target.value);
  };

  // Calculate total number of pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-body-tertiary'>
      <div className='flex flex-col justify-center font-body '>
        <nav className="bg-gray-800 navbar p-2 mb-4 font-body border-b border-gray-300 border-solid shadow-sm">
          <div className="container-fluid max-w-7xl mx-auto">
            <a className="navbar-brand font-semibold text-white">Go_CART</a>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="text" placeholder="Search products..." aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
              <div className=''>

                {!showModal && (
                  <button type="button" className="btn btn-dark position-relative border-1 border-white" onClick={toggle}>
                    <HiOutlineShoppingCart className='text-2xl text-white' />
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalQuantity}
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </nav>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
          {currentItems.map((product) => (
            <>
              <div key={product.id} className='relative bg-white border-1 shadow-md rounded-lg py-3 px-3 transition-transform duration-300 transform hover:-translate-y-1'>
                <div className='mb-16'>
                  <div className='flex justify-center'>
                    <img src={product.image} alt={product.title} className='rounded-md h-48' />
                  </div>
                  <div className='mt-4'>
                    <h1 className='text-lg uppercase font-bold'>{product.title.slice(0, 40)}...</h1>
                    <details className='mt-2'>
                      <summary className='mb-2 text-gray-600 text-sm truncate'>{product.description.slice(0, 20)}...</summary>
                      <p className='text-gray-600 text-sm'>{product.description}...</p>
                    </details>
                    <p className=' text-gray-800 font-semibold'>${product.price}</p>
                    <p className=''><Rating value={Math.round(product.rating.rate)} readonly /></p>
                  </div>
                </div>
                <div className='absolute bottom-0 left-0 mb-6 ml-3'>
                  <button
                    onClick={() => { addToCart(product); alert('Product added to cart!'); }}
                    className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className='flex justify-center my-4 flex-wrap gap-2 sm:gap-0'>
          {/* Previous button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md mx-2 ${currentPage === 1 ? 'bg-gray-300 text-gray-700' : 'bg-gray-800 text-white'}`}
          >
            Prev
          </button>
          {/* Pagination */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 rounded-md py-1 mx-2 ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
          {/* Next button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md mx-2 ${currentPage === totalPages ? 'bg-gray-300 text-gray-700' : 'bg-gray-800 text-white'}`}
          >
            Next
          </button>
        </div>
        <Cart showModal={showModal} toggle={toggle} />
      </div>
    </div>

  );
}

export default Products;
