import axios from "axios"

export const OpenApi = {
  async fetchData(pageNo: number) {
    return await axios.get(`http://apis.data.go.kr/6260000/FestivalService/getFestivalKr?ServiceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=20&resultType=json`);
  },
  
  async fetchOne(id: number) {
    return await axios.get(`http://apis.data.go.kr/6260000/FestivalService/getFestivalKr?ServiceKey=${import.meta.env.VITE_API_KEY}&pageNo=1&UC_SEQ=${id}&numOfRows=1&resultType=json`);
  }
}