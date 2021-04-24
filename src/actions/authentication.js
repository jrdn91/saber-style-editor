import api from "store/api"

export const login = (data) => {
  return api.post("/auth", data).then((res) => res.data)
}
