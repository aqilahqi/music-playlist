<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMusicStore } from '@/stores/music'

const store = useMusicStore()
const loading = computed(() => {
  return store.loading
})
const releases = computed(() => {
  return store.releases
})

onMounted(() => {
  store.getArtist()
  store.displayReleases()
})
</script>

<template>
  <div class="q-px-md q-py-xl">
    <div class="row justify-center">
      <div class="col-4 border">
        <h4>Releases</h4>
        <q-card class="my-card" v-for="release in releases" :key="release.id">
          <q-card-section>
            {{ release }}
          </q-card-section>
        </q-card>
      </div>
      <!-- <div class="ml-md col-4 gt-md border">right</div> -->
    </div>
  </div>
</template>
