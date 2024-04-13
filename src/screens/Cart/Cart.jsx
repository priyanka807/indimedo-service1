import { Heart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { calculateDiscountPercentage } from "../../ProductCard/ProductCard";
import { MenuItem, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {

  useCartRemoveMutation,
  useCartUpdateMutation,
  useLazyGetCartQuery,
} from "../../services/apis/product";
import { addProductToCart } from "../../redux/features/cartSlice";
import Header from "../../components/header/header";

function Cart() {
  const { cart
  
  } = useSelector((state) => state.cart);
  const {count} = useSelector((state)=>state.cart)
  //  const { cartOtherDetails } = useSelector((state) => state.cart);
  //   console.log(cartOtherDetails.totalAfterDiscount,'cartOtherDetails')

  //useSelector((state) =>console.log(state.cart,'state'));

  // const { count } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(cart, "cart");





  const [quantity, setQuantity] = useState(1);
  const [quantity1, setQuantity1] = useState();
  const [updateCart] = useCartUpdateMutation();
  const [removeCart] = useCartRemoveMutation();

  
  const [getcartData,getCardDataResponse] = useLazyGetCartQuery();
useEffect(()=>{
  getcartData()
},[])

// console.log(getCardDataResponse,'getCardDataResponse')


  const handleRemove = async (DeleteId) => {
 
     try {
        await removeCart({
          productId: DeleteId
        
        }).then((item) =>
    
          getcartData().then((data) =>
            // dispatch(addProductToCart(data))
            dispatch(addProductToCart(data?.data.product))
          )
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
      } finally {
        window.location.reload()
       }
 


};
 

  const handleUpdateToCart = async (productId, count) => { 
    console.log(productId,count,'count')
    if(count>=1){
      try {
        await updateCart({
          productId: productId,
          count,
        }).then((item) =>
          getcartData().then((data) =>
        
          // dispatch(addProductToCart(data?.data)),

          dispatch(addProductToCart(data?.data?.products))
          )
        );
          } catch (error) {
        console.error("Error adding item to cart:", error);
      } 
      finally {
       window.location.reload()
      }

    }};
 


  return (
    
    <div>
      {/* <button  onClick={dispatch()}>click:</button> */}

      {/* <button  onClick={()=>setQuantity(quantity+1)}>click:{quantity}</button> */}
        {/* {cart?.products.map((data)=>(
          <>{data.product.title}</>
        ))} */}


<div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <ul role="list" className="divide-y divide-gray-200">
              {getCardDataResponse?.data?.products?.map((items) => (
                  <div key={items.product._id} className="">
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={items.product.images_Src[0]}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              {/* <h3 className="text-sm">{items.product.title}</h3> */}
                              <h6 className="   h-13 overflow-hidden">
         
         {items.product.title.length > 40
           ? items.product.title.slice(0, 40) + "..."
           : items.product.title}
       </h6>


                            </div>

                            <div className="mt-1 flex items-end">
                              <p className="text-sm font-medium text-gray-500 line-through">
                              MRP&#8377;{items.product.reagular_price}
                              </p>
                            
                              &nbsp;&nbsp;
                              <span className="text-sm font-medium text-gray-500  hidden md:block">
                                &nbsp;&nbsp;&#8377;{items.product.sale_price}&nbsp;&nbsp;
                              </span>
                              <p className="text-sm font-medium text-green-500 hidden md:block">
                                {calculateDiscountPercentage(
                                  items.product.reagular_price,
                                  items.product.sale_price
                                )}{" "}
                                %&nbsp;
                              </p>
                              
                            </div>

<div className="flex justify-around  md:hidden">
<span className="text-sm font-medium text-gray-500">
                               &#8377;{items.product.sale_price}
                              </span> &nbsp;&nbsp;
                            <span  className="text-sm font-mediumtext-sm font-medium text-green-500"  style={{display:"block"}}>
                             {calculateDiscountPercentage(
                                  items.product.reagular_price,
                                  items.product.sale_price
                                )}{" "} %
                              </span>
</div>
                          

                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 flex">
                      <div className="min-w-24 flex">
                        <button
                          type="button"
                          className="h-7 w-7"
                          onClick={() =>
                            handleUpdateToCart(
                              items.product._id,
                              items.count - 1
                            )
                          }
                         
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          defaultValue={items.count}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateToCart(
                              items.product._id,
                              items.count + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                        >
                          <Trash size={12} className="text-red-500"  onClick={() => handleRemove(items.product._id)}/>
                          <span onClick={() => handleRemove(items.product._id)}
                            className="text-xs font-medium text-red-500"
                           
                          >
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">Price   (item  {count})</dt>
                    <dd className="text-sm font-medium text-gray-900">
                    ₹ {getCardDataResponse?.data?.cartTotal}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm text-gray-800">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">
                    ₹    {getCardDataResponse?.data?.cartTotal -getCardDataResponse?.data?.totalAfterDiscount}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount 
                    </dt>
                    <dd className="text-base font-medium text-gray-900"> ₹  {getCardDataResponse?.data?.totalAfterDiscount}</dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  You will save ₹    {getCardDataResponse?.data?.cartTotal- getCardDataResponse?.data?.totalAfterDiscount} on this order
                </div>
              </div>
            </section>
          </form>
        </div>
      </div> 
     
    </div>
  );
}
export default Cart;
