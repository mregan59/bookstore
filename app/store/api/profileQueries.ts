import data from "../data.json"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8010/proxy/api",
})

export const TOKENKEY = "@local:scToken"

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    throw err
  },
)

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = "APPTOKEN ZZZQBEXWEONYYKUE"
    config.headers["X-App-Version"] = "1.3.6"
    return config
  },
  (error) => {
    throw Promise.reject(error)
  },
)

export const search = ({ page }) => {
  return axiosInstance.get(`/lists/browses?page=${page}`, {
    // headers: {
    //   Authorization: 'APPTOKEN ZZZWCZNIPQDSXOBD',
    //   'X-App-Version': '1.3.6',
    // },
  })
  // return data.search.slice(page * 5, (page + 1) * 5)
}
export const birthdays = ({ page }) => {
  return axiosInstance.get(`/search/birthdays?page=${page}`)
  // return data.birthdays.slice(page * 5, (page + 1) * 5)
}
