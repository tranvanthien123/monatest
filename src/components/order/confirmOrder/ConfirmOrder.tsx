import React from "react";
import { EmailIcon, PersonIcon, PhoneIcon } from "../../../utils/icons";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/globalStore";
import { roundNumber } from "../../../utils/helper";
const ConfirmOrder = ({ onSetStep, dataConfirmPayment }) => {
  const dispatch = useDispatch();
  const handlePayment = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      onSetStep(3);
      localStorage.removeItem("cart");
      dispatch(setLoading(false));
    }, 1000);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
        <div
          className="flex flex-col relative w-auto my-6 mx-auto max-w-3xl"
          style={{ width: "100%" }}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Xác nhận thanh toán</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto w-full">
              <div className="w-full mt-2 mb-2">
                <span className="text-sky-500 mb-2">Thông tin khách hàng</span>
                <div
                  className={
                    "lg:grid lg:gap-4 lg:grid-cols-2 md:grid md:gap-4 md:grid-cols-2"
                  }
                >
                  <div className={"pt-4 pb-4"}>
                    <div className="flex">
                      <PersonIcon sx={{ fontSize: 22, color: "#1565C0" }} />
                      <span className={"ml-4 w-full focus:outline-none"}>
                        {dataConfirmPayment?.name}
                      </span>
                    </div>
                    <div className={"border-b-2 w-full border-slate-300"}></div>
                  </div>
                  <div className={"pt-4 pb-4"}>
                    <div className="flex">
                      <PhoneIcon sx={{ fontSize: 22, color: "#1565C0" }} />
                      <span className={"ml-4 w-full focus:outline-none"}>
                        {dataConfirmPayment?.phone}
                      </span>
                    </div>
                    <div className={"border-b-2 w-full border-slate-300"}></div>
                  </div>
                  <div className={"pt-4 pb-4"}>
                    <div className="flex">
                      <EmailIcon sx={{ fontSize: 22, color: "#1565C0" }} />
                      <span className={"ml-4 w-full focus:outline-none"}>
                        {dataConfirmPayment?.email}
                      </span>
                    </div>
                    <div className={"border-b-2 w-full border-slate-300"}></div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-2 mb-2">
                <span className="text-sky-500 mb-2">Thông tin đơn hàng</span>
                <div className={"pt-4 pb-4 flex flex-col"}>
                  <span className={"w-full focus:outline-none"}>
                    Tổng số lương: {dataConfirmPayment?.totalQuantity}
                  </span>
                  <span className={"w-full focus:outline-none"}>
                    Tổng đơn hàng:{" "}
                    {roundNumber(dataConfirmPayment?.totalPrice)}{" "}
                    (VND)
                  </span>
                </div>
              </div>
              <div className="w-full mt-2 mb-2">
                <span className="text-sky-500 mb-2">
                  Phương thức thanh toán
                </span>
                <div className={"pt-4 pb-4 flex flex-col"}>
                  <span className={"w-full focus:outline-none"}>
                    Thanh toán bằng: {dataConfirmPayment?.paymentMethod?.cash ? "Tiền mặt" : 'Thẻ ngân hàng'}
                  </span>
                </div>
              </div>
              <div className="w-full mt-2 mb-2">
                <span className="text-sky-500 mb-2">Thanh toán</span>
                <div className="border-b-2 w-full border-slate-300"></div>
                <div className={"pt-4 pb-4 flex flex-col"}>
                  {
                    dataConfirmPayment?.paymentMethod?.cash ? 
                    <span className={"w-full focus:outline-none"}>
                      Tiền khách nhập: {roundNumber(dataConfirmPayment?.cash)} (VND)
                    </span> : <></>
                  }
                  <span className={"w-full focus:outline-none"}>
                    Tổng tiền phải trả: {roundNumber(dataConfirmPayment?.totalPrice)} (VND)
                  </span>
                  {
                    dataConfirmPayment?.changeMoney > 0 ?
                      <span className={"w-full focus:outline-none"}>
                        Tiền thừa trả khách: {roundNumber(dataConfirmPayment?.changeMoney)} (VND)
                      </span>: <></>    
                  }
                </div>
              </div>
              <div className="w-full mt-2 mt-2">
                <span className="text-red-600 mb-2 text-sm">
                  *Sau khi thanh toán sẽ không được hoàn tác, vui lòng kiểm tra
                  kỹ trước khi thực hiện*
                </span>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onSetStep(1)}
              >
                Huỷ
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handlePayment}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
    </>
  );
};

export default React.memo(ConfirmOrder);
