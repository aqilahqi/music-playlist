import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../lib/API'

export const useMusicStore = defineStore('music', () => {
  const releases = ref([])
  const artist = ref(null)
  const favourites = ref([])
  const loading = ref(false)

  function getArtist() {
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

  function displayReleases() {
    return new Promise((resolve, reject) => {
      loading.value = true
      api
        .get('/artists/21262/releases')
        .then((response) => {
          releases.value = []
          response.data.releases.map((a) => {
            if (favourites.value.length > 0) {
              favourites.value.map((f) => {
                if (a.id === f.id) {
                  a = Object.assign(a, { favourite: true })
                } else {
                  a = Object.assign(a, { favourite: false })
                }
              })
            } else {
              a = Object.assign(a, { favourite: false })
            }
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
    if (releases.value.length > 0) {
      releases.value.map((release) => {
        if (release.id === obj.id) {
          release.favourite = !release.favourite
        }
      })
    }
    if (favourites.value.length > 0) {
      favourites.value.map((f) => {
        if (obj.id === f.id) {
          obj.favourite = !obj.favourite
        }
      })
    }
  }

  return { releases, artist, favourites, loading, getArtist, displayReleases, toggleFavourites }
})
