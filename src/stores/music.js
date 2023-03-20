import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../lib/API'

export const useMusicStore = defineStore('music', () => {
  const releases = ref([])
  const artist = ref(null)
  const favourites = ref([])
  const loading = ref(false)

  async function getArtist() {
    return new Promise((resolve, reject) => {
      api
        .get('/artists/21262')
        .then((response) => {
          artist.value = response.data
          resolve('artist profile retrieved')
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async function displayReleases() {
    return new Promise((resolve, reject) => {
      loading.value = true
      api
        .get('/artists/21262/releases')
        .then((response) => {
          releases.value = []
          response.data.releases.map((a) => {
              a = Object.assign(a, { favourite: false })
              favourites.value.map((f) => {
                if (a.id === f.id) {
                  a = Object.assign(a, { favourite: true })
                }
              })
            releases.value.push(a)
          })
          resolve('releases retrieved')
          loading.value = false
        })
        .catch((error) => {
          reject(error)
          loading.value = false
        })
    })
  }
  function toggleFavourites(obj) {
    const findInFavourites = favourites.value.find((favourite) => favourite.id == obj.id)
    const findInReleases = releases.value.findIndex((release) => release.id == obj.id)

    releases.value[findInReleases].favourite = !releases.value[findInReleases].favourite
    if (!findInFavourites) {
      favourites.value.push(obj)
    } else {
      favourites.value = favourites.value.filter((favourite) => favourite.id !== obj.id)
    }
  }

  return { releases, artist, favourites, loading, getArtist, displayReleases, toggleFavourites }
})
