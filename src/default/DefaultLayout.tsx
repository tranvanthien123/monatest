import React, { useEffect, useLayoutEffect, useState } from "react";
import CreateOrder from "../components/order/createOrder/CreateOrder";
import Cart from "../components/cart/Cart";
import { getProduct } from "../utils/api";
import { listProduct } from "../interface/createOrder";
import Skeleton from "../components/skeleton/Skeleton";
import Loading from "../components/loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const DefaultLayout = () => {
  
  const loading = useSelector((state: RootState) => state.globalStore.loading)

  const [showCart, setShowCart] = useState<boolean>(false);
  const [skeleton, setSkeleton] = useState<boolean>(true);

  const [listProduct, setListProduct] = useState<listProduct[]>([]);

  const [listCartItems, setListCartItems] = useState<listProduct[]>([]);

  const getLocalData = async () => {
    const local = await localStorage.getItem("cart");
    return local;
  };
  
  const fetchProduct = async () => {
    const productList = await getProduct();
    return productList;
  };

  useEffect(() => {
    setSkeleton(true)
    const fetchData = () => {
      setTimeout(async() => {
        const [localData, productList] = await Promise.all([
          getLocalData(),
          fetchProduct()
        ]);
        if (localData) {
          const parsedData = JSON.parse(localData);
          setListCartItems(parsedData);
        }
        setListProduct(productList);
        setSkeleton(false)
      }, 1000);
    }
    fetchData();
  }, []);
  

  const onSetListCartItems = async (data: listProduct[]) => {
    setListCartItems(data);
  };

  const onSetShowCart = (boolean: boolean) => {
    setShowCart(boolean);
  };

  const onUpdateListCart = (data: listProduct[]) => {
    if(data.length <=0) {
      setShowCart(false);
    }
    localStorage.setItem('cart', JSON.stringify(data));
    setListCartItems(data);
  }

  return (
    <>
      { loading ? <Loading /> : <></> }
      {skeleton ? ( <Skeleton/> ) : (
        <>
          {showCart ? (
            <Cart
              onSetShowCart={onSetShowCart}
              listCartItems={listCartItems}
              onUpdateListCart={onUpdateListCart}
            />
          ) : (
            <CreateOrder
              onSetShowCart={onSetShowCart}
              listProduct={listProduct}
              listCartItems={listCartItems}
              onSetListCartItems={onSetListCartItems}
            />
          )}
        </>
      )}
    </>
  );
};

export default React.memo(DefaultLayout);
