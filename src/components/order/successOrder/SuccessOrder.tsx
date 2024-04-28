import React from 'react'
import { CheckCircleIcon } from '../../../utils/icons'
import { Button } from '@mui/material'

const SuccessOrder = () => {
  const handleContinue = () => {
    window.location.reload()
  }
  return (
    <div className="flex justify-center items-center h-screen">
        <div className={"flex flex-col border border-gray-300 shadow-lg rounded-md p-6 w-full max-w-md"}>
          <div className='flex flex-col justify-center items-center'>
            <div className="flex items-center pb-2 justify-between">
                <CheckCircleIcon sx={{fontSize: 80, color:'#33CC00'}}/>
            </div>
            <span className='text-green-600 text-3xl'>Thanh toán thành công</span>
            <span className='text-neutral-700 text-center'>Đơn hàng của bản đã được thanh toán thành công, chúng tôi sẽ sớm liên hệ với bạn.</span>
            <div className='mt-4 mb-4'>
              <Button variant="contained" size="medium" className="w-full" onClick={()=>handleContinue()}>
                Tiếp tục mua hàng
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SuccessOrder