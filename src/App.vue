<template>
  <div>
    <Map :geojson=geojson />
  </div>
  <div>
    <Container :geojson=geojson />
  </div>
  
</template>

<script>
import Map from './components/Map.vue'
import Container from './components/Container.vue'

export default {
  name: 'App',
  components: {
    Map,
    Container
  },
  data() {
    return {
      geojson: null,
      loading: false,
    }
  },
  async created() {
        this.loading = true;
        const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
        const data = await response.json();
        this.geojson = data;
        this.loading = false;
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: -8px;
  margin-top: -8px;
}


</style>
