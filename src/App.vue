<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-dark">
    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar square style="width: 22px; height: 30px">
            <q-img src="./assets/blackpanda_white.png" fit="contain" />
          </q-avatar>
          Blackpanda Assessment
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
