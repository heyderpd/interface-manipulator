import axios from 'axios'

const base = 'https://swapi.co/api/'
const planets = `${base}planets/`

const get = async url => {
  try {
    const { status, data } = await axios.get(url)
    if (status < 400) {
      return { response: data }
    } else {
      return { error: data }
    }
  } catch (error) {
    console.error('axios', url, error)
    return { error }
  }
}

export const getPages = async () => get(planets)

export const getPlanet = async id => get(`${planets}${id}/`)
