<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMusicStore } from '@/stores/music'
import Favourites from '../components/favourites.vue'

const store = useMusicStore()
const dialog = ref(false)

const releases = computed(() => {
  return store.releases
})
const favourites = computed(() => {
  return store.favourites
})
const artist = computed(() => {
  return store.artist
})
const open = () => {
  dialog.value = true
}

onMounted(() => {
  store.getArtist()
  store.displayReleases()
})
</script>

<template>
  <div class="q-px-md q-py-xl">
    <div class="row justify-center">
      <div class="col-md-4 border">
        <p class="text-weight-bold text-uppercase q-mb-sm">Releases</p>
        <h4 class="q-mb-lg" v-if="artist">{{ artist.name }}</h4>
        <q-card class="my-card bg-secondary q-mb-sm" v-for="release in releases" :key="release.id">
          <q-card-section>
            <div class="row no-wrap justify-between items-start">
              <div class="row no-wrap">
                <q-avatar rounded>
                  <img :src="release.thumb || 'https://cdn.quasar.dev/img/avatar.png'" />
                </q-avatar>
                <div class="q-px-md">
                  <p class="q-mb-none">{{ release.title }}</p>
                  <small class="text-grey-5">{{ release.year }}</small>
                </div>
              </div>
              <q-btn
                flat
                round
                :color="release.favourite ? 'accent' : 'grey-5'"
                :icon="release.favourite ? 'favorite' : 'favorite_border'"
                @click="store.toggleFavourites(release)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="favourites.length > 0">
        <q-btn
          round
          icon="favorite"
          text-color="accent"
          size="lg"
          style="background: rgba(255, 255, 255, 0.1)"
          @click="open('right')"
        />
      </q-page-sticky>

      <q-dialog v-model="dialog" position="bottom">
        <q-card class="bg-accent custom-dialog" style="width: 350px">
          <q-card-section><Favourites /></q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
