import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.discogs.com'
})

export async function getReleases() {
  const { data } = await api.get('/artists/21262/releases')
  return data
}
