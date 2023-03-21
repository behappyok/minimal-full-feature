/*
 * @Description  : 
 * @Author       : zyl
 * @Date         : 2023-03-21 17:31:32
 * @LastEditTime : 2023-03-21 18:07:45
 * @FilePath     : \\my-vue-app\\src\\utils\\defHttp.ts
 */
import axios from "axios";
const defHttp =  axios.create({
  baseURL:'/api',
  headers: {
    authorization:
      `Bearer ${import.meta.env.VITE_JWT}`,
  },  
});

defHttp.interceptors.response.use((res)=>{  
  return  res.data.data
})
export default defHttp