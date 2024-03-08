import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context
  const calculateDiscountedPrice = (price, discountedPercentage) => {
    const discountedAmount = (price * discountedPercentage) / 100;
    return price - discountedAmount;
  };
  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ?
        (<>
          <div className=" h-full pt-10">
            {
              order.filter(obj => obj.userid == userid).map((order) => {
                // order.cartItems.map()
                return (
                  <div className="mx-auto justify-center px-6 flex-wrap md:flex md:space-x-6 xl:px-0">
                    {
                      
                      order.cartItems.map((item) => {
                        return (
                          <div className="rounded-lg md:w-2/3">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                              <img src={item.imageUrl} alt="product-image" className="w-full object-cover rounded-lg sm:w-40" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                  <p className="mt-1 text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                  <p className="mt-1 text-2xl font-bold text-red-400" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{calculateDiscountedPrice(item.price,item.discountedPrice)}</p>
                                  <p className="mt-1 font-medium text-xl text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Quantity : {item.quantity}</p>
                                  <p>Ordered On : {order.date}</p>
                                  <p className="mt-4 text-green-800">The order will be delivered within 1 to 7 days.</p>

                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    } 
                  </div>
                )
              })
            }
          </div>
        </>)
        :
        (
          <h2 className=' text-center tex-2xl text-white'>Not Order</h2>
        )

      }
    </Layout>
  )
}

export default Order