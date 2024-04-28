import React, { useMemo } from 'react'
import { ArrowBackIosNewIcon } from '../../utils/icons'
import ItemCart from './ItemCart'
import { listProduct } from '../../interface/createOrder'
import { servicesTotalPrice, servicesTotalQuantity } from '../../utils/services'
import { roundNumber } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/globalStore'
const Cart = ({onSetShowCart, listCartItems, onUpdateListCart}) => {

  const dispatch = useDispatch()

  const totalQuantity:number = useMemo(() => {

    return servicesTotalQuantity(listCartItems)

  }, [listCartItems])

  const totalPrice:number = useMemo(() => {

    return servicesTotalPrice(listCartItems)

  }, [listCartItems])

  const handleReturn = () => {
    dispatch(setLoading(true))
    setTimeout(() => {
      onSetShowCart(false)
      dispatch(setLoading(false))
    }, 1000);
  }

  const onModifyQuantity: (index:number, actions:string) =>void = (index: number, actions:string) => {
    let copyArray:listProduct[] = JSON.parse(JSON.stringify(listCartItems))
    switch(actions) {
      case 'increase':
        if(copyArray[index]) {
          copyArray[index].quantity += 1
        }
      break;
      case 'reduce':
        if(copyArray[index]) {
          copyArray[index].quantity -= 1
          if(copyArray[index].quantity === 0) {
            copyArray.splice(index, 1)
          }
        }
      break;
    }
    onUpdateListCart(copyArray)
  }

  const onRemoveItemCart: (index:number) => void = (index:number) => {
    let copyArray:listProduct[] = JSON.parse(JSON.stringify(listCartItems))
    if(copyArray[index]) {
      copyArray.splice(index, 1);
    }
    onUpdateListCart(copyArray)
  }

  return (
    <div className="flex justify-center h-screen">
      <div className={"flex flex-col border border-gray-300 shadow-lg rounded-md p-6 w-full max-w-2xl"}>
        <div>
          <div className="flex items-center pb-2 justify-between">
            <div className="flex items-center cursor-pointer" onClick={handleReturn}>
              <ArrowBackIosNewIcon sx={{fontSize: 22, color:'#1565C0'}}/>
              <h1 className="text-lg text-sky-700">Quay lại</h1>
            </div>
            <h1 className="text-lg">Danh sách sản phẩm</h1>
          </div>
          <div className="border-b-2 w-full border-slate-300"></div>
        </div>
        <div className='w-full overflow-auto mt-4 mb-4 flex-1'>
          {
            listCartItems.map((item:listProduct, index:number) => (
              <ItemCart
                item={item}
                index={index}
                key={index}
                onRemoveItemCart={onRemoveItemCart}
                onModifyQuantity={onModifyQuantity}
              />
            ))
          }
        </div>
        <div className={"pt-4"}>
          <h1 className="text-sky-700 mb-2 text-lg">Tổng thanh toán</h1> 
          <div className="flex items-center">
            <span>Tổng số lượng: {totalQuantity}</span>
          </div>
          <div className="flex items-center">
            <span>Tông tiền: {roundNumber(totalPrice)} (VND)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Cart)
