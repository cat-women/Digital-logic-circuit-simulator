import axios from 'axios'

export default function config () {
  const user = JSON.parse(sessionStorage.getItem('user'))
  axios.defaults.baseURL = 'http://localhost:8000/'
  console.log('userin config', user)
  if (user) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.data
      .access_token}`
  }
  return axios
}
