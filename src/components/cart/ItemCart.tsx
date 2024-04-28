import React from 'react'
import { AddCircleIcon, DeleteIcon, DoNotDisturbOnIcon } from '../../utils/icons'
import { roundNumber } from '../../utils/helper';
const ItemCart = ({item, index, onRemoveItemCart, onModifyQuantity}) => {

  const handleModifyQuantity = (actions:string) => {
    onModifyQuantity(index, actions)
  }

  const handleRemoveItemCart = () => {

    onRemoveItemCart(index)

  }
  return (
    <div className='w-full h-20 rounded-md mt-2 mb-2 border border-gray-300 flex items-center pr-4 pl-4'>
      <div className='flex items-center flex-1'>
        <img src={require('../../public/img/clothes.jpg')} alt="" className='w-16 h-16 rounded-md'/>
        <div className='flex flex-col pr-2 pl-2'>
          <span className='text-sm text-slate-950'>{item?.label}</span>
          <span className='text-xs text-gray-500'>{roundNumber(item?.price)} (VND)</span>
        </div>
      </div>
      <div className='flex sm:items-center items-end sm:flex-row flex-col'>
        <div className='flex items-center border border-gray-300 rounded-md p-1'>
          <span className='text-gray-950 pr-2 pl-2'>{item?.quantity}</span>
          <div onClick={() => handleModifyQuantity('increase')}>
            <AddCircleIcon sx={{fontSize: 22, color:'#1565C0', margin:"0 2px", cursor: "pointer"}}/>
          </div>
          <div onClick={() => handleModifyQuantity('reduce')}>
            <DoNotDisturbOnIcon sx={{fontSize: 22, color:'#1565C0', margin:"0 2px", cursor:"pointer"}}/>
          </div>
        </div>
        <div className='sm:ml-4 mt-1 md:mt-0 lg:mt-0 cursor-pointer' onClick={()=>handleRemoveItemCart()}>
          <DeleteIcon sx={{fontSize: 26, color:'red'}}/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ItemCart);