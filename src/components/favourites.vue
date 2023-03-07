<script setup>
import { computed } from 'vue'
import { useMusicStore } from '@/stores/music'

const store = useMusicStore()
const favourites = computed(() => {
  return store.favourites
})
</script>

<template>
  <div>
    <q-card
      v-if="favourites.length > 0"
      class="my-card bg-secondary q-mb-sm"
      v-for="favourite in favourites"
      :key="favourite.id"
    >
      <q-card-section>
        <div class="row no-wrap justify-between items-start">
          <div class="row no-wrap">
            <q-avatar rounded>
              <img :src="favourite.thumb || 'https://cdn.quasar.dev/img/avatar.png'" />
            </q-avatar>
            <div class="q-px-md">
              <p class="q-mb-none">{{ favourite.title }}</p>
              <small class="text-grey-5">{{ favourite.year }}</small>
            </div>
          </div>
          <q-btn
            flat
            round
            :color="favourite.favourite ? 'accent' : 'grey-5'"
            :icon="favourite.favourite ? 'favorite' : 'favorite_border'"
            @click="store.toggleFavourites(favourite)"
          />
        </div>
      </q-card-section>
    </q-card>
    <p v-else>You do not have any favourites...</p>
  </div>
</template>
