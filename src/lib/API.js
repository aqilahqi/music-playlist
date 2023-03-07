import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.discogs.com'
})

export async function getReleases() {
  const { pagination, releases } = await api.get('/artists/21262/releases')
  return pagination, releases
}
