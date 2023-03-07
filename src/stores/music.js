import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('music', () => {
  const releases = ref([])
  const favourites = ref([])

  function displayReleases(arr) {
    releases.value = []

    const newMusicList = arr.map((a) => {
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
    })

    releases.value.concat(...newMusicList)
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

  return { releases, favourites, displayReleases, toggleFavourites }
})
