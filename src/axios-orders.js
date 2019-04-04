import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-bdd91.firebaseio.com/'
})

export default instance
