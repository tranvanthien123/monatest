import axios from "axios";
let url = "https://662cce480547cdcde9df2ea7.mockapi.io"

export const getProduct = async () => {
  const request = await axios({
    method: "get",
    url: `${url}/product/list/product-list`,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });
  return request.data;
};