import React, { useMemo, useState } from "react";
import Select from 'react-select';
import { Formik as ValidateForm, Form, Field } from "formik";
import { infoForm, listProduct } from "../../../interface/createOrder";
import { PersonIcon, EmailIcon, PhoneIcon, LocalAtmIcon, ShoppingCartIcon} from '../../../utils/icons';
import Button from "@mui/material/Button";
import ConfirmOrder from "../confirmOrder/ConfirmOrder";

import { infoOrderSchema } from "../../../utils/validation";
import { formatCurrencyToNumber, roundNumber } from "../../../utils/helper";
import { servicesTotalPrice, servicesTotalQuantity } from "../../../utils/services";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/globalStore";
import SuccessOrder from "../successOrder/SuccessOrder";

const CreateOrder = ({onSetShowCart, listProduct, listCartItems, onSetListCartItems}) => {

  const dispatch = useDispatch()

  const [selectedOption, setSelectedOption] = useState<listProduct[]>([]);

  const [cash, setCash] = useState<string>("0");

  const [paymentMethod, setPaymentMethod] = useState<{cash: boolean, bank: boolean}>({cash: true, bank: false})

  const [stepOrder, setStepOder] = useState<number>(1)

  const [dataConfirmPayment, setDataConfirmPayment] = useState(null)

  const totalQuantity = useMemo(() => {

    return servicesTotalQuantity(listCartItems)

  }, [listCartItems])

  const totalPrice = useMemo(() => {

    return servicesTotalPrice(listCartItems)

  }, [listCartItems])

  const changeMoney = useMemo(() => {

    return formatCurrencyToNumber(cash) - totalPrice

  },[totalPrice, cash])



  const onChangPaymentMethod = (method: string) => {
    switch (method) {
      case 'bank':
        setPaymentMethod({cash: false, bank: true})
      break;
      case 'cash':
        setPaymentMethod({cash: true, bank: false})
      break;
    }
  }
  const onSetShowConfirm = (values: infoForm) => {
    if(listCartItems.length > 0) {
      let data = {...values}
      data['totalQuantity'] = totalQuantity
      data['totalPrice'] = totalPrice
      data['changeMoney'] = changeMoney
      data['paymentMethod'] = paymentMethod
      data['cash'] = formatCurrencyToNumber(cash)
      dispatch(setLoading(true))
      setTimeout(() => {
        setDataConfirmPayment(data)
        setStepOder(2)
        dispatch(setLoading(false))
      }, 1000);
      return
    }
    alert('Vui lòng thêm sản phẩm vào giỏ hàng!')
  };
  const handleSetStepOrder = (step:number) => {
    setStepOder(step)
  }
  const handlePushProductCart = () => {
    if(selectedOption.length > 0) {
      dispatch(setLoading(true))
      //thuật toán hash map
      setTimeout(() => {
        const result = Object.fromEntries(listCartItems.map(obj => [obj.id, obj]));

        for (let i = 0 ;i < selectedOption.length ; i++) {
          if (result[selectedOption[i].id]) {
            result[selectedOption[i].id].quantity += 1
          }
          else {
            result[selectedOption[i].id] = selectedOption[i]
          }
        }
        const list = Object.values(result)
        localStorage.setItem('cart', JSON.stringify(list))
        onSetListCartItems(list)
        setSelectedOption([])
        dispatch(setLoading(false))
      }, 1000);
    }
  }

  const handleChange = (selectedOption:listProduct[]) => {
    setSelectedOption(selectedOption)
  }

  const handleShowCart = () => {
    if(listCartItems.length > 0) {
      dispatch(setLoading(true))
      setTimeout(() => {
        onSetShowCart(true)
        dispatch(setLoading(false))
      }, 1000);
    }
  }

  return (
    <div className="flex justify-center items-center">
      {stepOrder === 1 || stepOrder === 2 ? 
        <div className={"flex flex-col border border-gray-300 shadow-lg rounded-md p-6 w-full max-w-2xl"}>
          <div>
            <div className="flex items-center pb-2 justify-between">
              <h1 className="text-lg">Thông Tin Thanh Toán</h1>
              <div className="flex items-center cursor-pointer" onClick={handleShowCart}>
                <ShoppingCartIcon sx={{fontSize: 22, color:'#1565C0'}}/>
                <span className="text-red-500">({totalQuantity})</span>
              </div>
            </div>
            <div className="border-b-2 w-full border-slate-300"></div>
          </div>
          <ValidateForm
            initialValues={{
              name: "",
              phone: "",
              email: "",
            }}
            validationSchema={infoOrderSchema}
            onSubmit={(values) => {
              onSetShowConfirm(values);
            }}
          >
            {({ errors, touched, handleSubmit, setFieldValue }) => (
              <Form>
                <div className={"mb-10 mt-10 w-full"}>
                  <div className={"lg:grid lg:gap-4 lg:grid-cols-2 md:grid md:gap-4 md:grid-cols-2"}>
                    <div className={"pt-2 pb-2"}>
                      <div className="flex">
                        <PersonIcon sx={{fontSize: 22, color:'#1565C0'}}/>
                        <Field name="name" className={"ml-4 w-full focus:outline-none"} placeholder="Họ và tên"/>
                      </div>
                      <div className={"border-b-2 w-full border-slate-300"}></div>
                      {errors.name && touched.name ? <div className="text-red-500 text-xs p-2">{errors.name}</div> : null}
                    </div>
                    <div className={"pt-2 pb-2"}>
                      <div className="flex">
                        <PhoneIcon sx={{fontSize: 22, color:'#1565C0'}}/>
                        <Field name="phone" className={"ml-4 w-full focus:outline-none"} placeholder="Số điện thoại"/>
                      </div>
                      <div className={"border-b-2 w-full border-slate-300"}></div>
                      {errors.phone && touched.phone ? <div className="text-red-500 text-xs p-2">{errors.phone}</div> : null}
                    </div>
                    <div className={"pt-2 pb-2"}>
                      <div className="flex">
                        <EmailIcon sx={{fontSize: 22, color:'#1565C0'}}/>
                        <Field name="email" type="email" className={"ml-4 w-full focus:outline-none"} placeholder="Email"/>
                      </div>
                      <div className={"border-b-2 w-full border-slate-300"}></div>
                      {errors.email && touched.email ? (<div className="text-red-500 text-xs p-2">{errors.email} </div>) : null}
                    </div>
                  </div>
                  <div className={"pt-4 pb-4"}>
                    <div className="mb-4">
                      <h1 className="text-sky-500 mb-1">Thêm sản phẩm vào giỏ hàng</h1>
                      {
                        selectedOption.length > 0 ? <h1 className="text-red-500 text-xs">*Xác nhận để thêm sản phẩm vào giỏ hàng</h1> : <></>
                      }
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <Select
                          value={selectedOption}
                          options={listProduct}
                          onChange={handleChange}
                          isMulti={true}
                          placeholder="Chọn sản phẩm"
                        />
                      </div>
                      <Button variant="contained" size="small" style={{margin: "0 0 0 8px", height: "36px"}} onClick={handlePushProductCart}>
                        Xác nhận
                      </Button>
                    </div>
                  </div>
                  <div className={"pt-4 pb-4"}>
                    <h1 className="text-sky-500 mb-2">Phương thức thanh toán</h1> 
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="cash"
                        className="w-3.5 h-3.5 mr-2 mt-0.5"
                        checked={paymentMethod.cash}
                        onChange={() => onChangPaymentMethod("cash")}
                      />
                      <span>Tiền mặt (VND)</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="bank"
                        className="w-3.5 h-3.5 mr-2 mt-0.5"
                        checked={paymentMethod.bank}
                        onChange={() => onChangPaymentMethod("bank")}
                      />
                      <span>Thẻ ngân hàng</span>
                    </div>
                  </div>
                  {
                    paymentMethod.cash ? (
                      <div className={"pt-4 pb-4"}>
                        <div className="flex">
                          <LocalAtmIcon sx={{fontSize: 22, color:'#1565C0'}}/>
                          <Field
                            name="cash"
                            type="text"
                            className={"ml-4 w-full focus:outline-none"}
                            placeholder="Nhập số tiền"
                            value={cash}
                            onChange={(e:any) => {
                              const value = roundNumber(e.target.value)
                              setCash(value)
                            }}
                          />
                        </div>
                        <div className={"border-b-2 w-full border-slate-300"}></div>
                      </div>
                    ) : <></>
                  }
                  <div className={"pt-4"}>
                    <h1 className="text-sky-500 mb-2">Tổng thanh toán</h1> 
                    <div className="flex items-center">
                      <span>Tổng số lượng: {totalQuantity}</span>
                    </div>
                    <div className="flex items-center">
                      <span>Tông tiền: {roundNumber(totalPrice)} (VND)</span>
                    </div>
                    {
                      changeMoney > 0 && paymentMethod.cash ? 
                        <div className="flex items-center">
                          <span>Tiền thừa trả khách: {roundNumber(changeMoney)} (VND)</span>
                        </div> : <></>
                    }
                  </div>
                </div>
                <Button variant="contained" size="medium" className="w-full" onClick={() => handleSubmit()}>
                  Thanh Toán
                </Button>
              </Form>
            )}
          </ValidateForm>
        </div> : <></>
      }
      {stepOrder === 2 && dataConfirmPayment ? <ConfirmOrder onSetStep={handleSetStepOrder} dataConfirmPayment={dataConfirmPayment}/> : <></>}
      {stepOrder === 3 ? <SuccessOrder /> : <></>}
    </div>
  );
};

export default React.memo(CreateOrder);
