import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from '../context/Context'

export default function Cart({ showModal, toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

    // Function to handle clearing the cart with confirmation
    const handleClearCart = () => {
      // Display confirmation alert
      const confirmClear = window.confirm('Are you sure you want to clear the cart?');
  
      // If user confirms, clear the cart
      if (confirmClear) {
        clearCart();
      }else {
        Cart();
      }
    };

  return (
    showModal && (
      <div className="border-2 shadow-xl flex-col flex items-center fixed inset-0 left-1/4 bg-white dark:bg-black p-10 text-black dark:text-white font-normal uppercase text-sm overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div className="overflow-y-auto max-h-96 mb-4 w-full">
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div className="flex flex-wrap justify-between items-center border-t border-b border-gray-300 border-solid py-2 px-3" key={item.id}>
                <div className="flex gap-3">
                  <img src={item.image} alt={item.title} className="rounded-md h-20" />
                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold">{item.title}</h1>
                    <p className="text-black font-semibold">${item.price}</p>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-4">
                  <button
                    className=" px-3 py-1 bg-gray-800 text-white text-center text-xl font-bold uppercase rounded hover:bg-blue-900 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      addToCart(item)
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="px-3 py-1 bg-gray-800 text-center text-white text-xl font-bold uppercase rounded hover:bg-red-900 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      removeFromCart(item)
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-lg font-bold mb-4">Total: ${getCartTotal().toFixed(2)}</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-red-900 focus:outline-none focus:bg-gray-700"
            onClick={() => {
              handleClearCart() ,clearCart()
            }}
          >
            Clear cart
          </button>
        </div>
        <button
          className="absolute top-10 right-10 px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-red-900 focus:outline-none focus:bg-gray-700"
          onClick={toggle}
        >
          X
        </button>
      </div>
    )
  )
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func
}
