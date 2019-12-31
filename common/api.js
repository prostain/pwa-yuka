import axios from 'axios'

export async function asyncGetProducts() {
  try {
    const response = axios.get('http://localhost:3001')
  } catch (err) {
    console.error('o no')
    return []
  }
}
