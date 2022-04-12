<template>
    <div id="map">

        <l-map
            ref="map"
            :center="center"
            v-model="zoom"
            v-model:zoom="zoom"
            :options="{zoomControl:false, attributionControl:true}"
            :maxZoom="maxZoom"
        >
        <!-- Background maps: -->
        <l-tile-layer
            v-for="tileProvider in tileProviders"
            :key="tileProvider.name"
            :name="tileProvider.name"
            :visible="tileProvider.visible"
            :url="tileProvider.url"
            :attribution="tileProvider.attribution"
            layer-type="base" />

        <!-- Add geojson data -->
        <l-geo-json
            :geojson="geojson" 
            :options="options"
            :options-style="styleFunction"
        />    

         <!-- Leaflet control tools here: -->
        <l-control-scale position="bottomright" :imperial="false" :metric="true" /> 
        <l-control-layers position="topright" />
        <l-control-zoom position="topright" />

        </l-map>
    </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LControlScale,
  LControlZoom,
  LGeoJson
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
    name: 'Map',
    components: {
        LMap,
        LTileLayer,
        LControlLayers,
        LControlScale,
        LControlZoom,
        LGeoJson
    },
    data() {
        return {
            center: [41.97950, -101.74180],
            zoom: 3,
            maxZoom: 8,
            geojson: null,
            tileProviders: [
                {
                name: 'OpenStreetMap',
                visible: true,
                attribution:
                    '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                },
                {
                name: 'ESRI_WorldImagery',
                visible: false,
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attribution:
                    'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                },
                {
                name: 'OpenTopoMap',
                visible: false,
                url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                attribution:
                    'TMap data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                },
            ],
        };
    },
    computed: {
        options() {
            return {
                onEachFeature: this.onEachFeatureFunction
            }; 
        },
        styleFunction() {
            const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
            return () => {
                return {
                weight: 2,
                color: "#ECEFF1",
                opacity: 1,
                fillColor: fillColor,
                fillOpacity: 1
                };
            };
        },
        onEachFeatureFunction() {
            if (!this.enableTooltip) {
                return () => {};
            }
            return (feature, layer) => {
                layer.bindTooltip(
                    "<div>code:" +
                        feature.properties.code +
                        "</div><div>nom: " +
                        feature.properties.nom +
                        "</div>",
                    { permanent: false, sticky: true }
                    );
            };
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




<style scoped>
#map {
  position: fixed;
  height: 100vh; 
  width: 100vw;
  margin: 0;
  z-index: 0;
};
.l-control-layers { 
  text-align: left; 
}
</style>