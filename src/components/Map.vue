<template>
    <div id="map">

        <l-map
            ref="map"
            :center="center"
            v-model="zoom"
            v-model:zoom="zoom"
            :options="{zoomControl:false, attributionControl:true}"
            :minZoom="minZoom"
            
        >
        <!-- Background maps: -->
        <l-tile-layer
            v-for="tileProvider in tileProviders"
            :key="tileProvider.name"
            :name="tileProvider.name"
            :visible="tileProvider.visible"
            :url="tileProvider.url"
            :attribution="tileProvider.attribution"
            layer-type="base" 
            />

        <!-- Add geojson data -->
        <l-geo-json
            :geojson="geojson" 
            :options="options"
            visible=false
        />    
        <!-- :options-style="styleFunction"  -->

        <!-- Check this: https://github.com/vue-leaflet/Vue2Leaflet/issues/358 -->
        <div
            v-for="feature in features"
            :key="feature.id">
            <l-circle-marker
                :lat-lng="feature.latlng"
                :radius="radius"
                :popup="popup"
                >
            </l-circle-marker>
        </div>
    


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
  LGeoJson,
  LCircleMarker
  
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
        LGeoJson,
        LCircleMarker
      
    },
    props: {geojson: Object},
    data() {
        return {
            center: [34.82688, -156.05821],
            zoom: 3,
            minZoom: 2,
            fillColor: "#e4ce7f",
            radius:6,
            popup:'hi there',
            tileProviders: [
                {
                name: 'OpenStreetMap',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                },
                {
                name: 'ESRI_WorldImagery',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attribution:
                    'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                },
                {
                name: 'Stamen.TerrainBackground',
                url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png',
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                },
                {name: 'Stamen.Watercolor',
                url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
                attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                },
                
            ],
            features: [
                {id:1, latlng:[33.0125, -116.4958333]},
                {id:2, latlng:[33.9655, -117.1318333]}
            ]
        };
    },
    computed: {
        options() {
            return {
                onEachFeature: this.onEachFeatureFunction,
            }; 
        },
        styleFunction() {
            const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
            return () => {
                return {
                weight: 2,
                color: "#ECEFF1",
                opacity: 0.2,
                fillColor: fillColor,
                fillOpacity: 1
                };
            };
        },
        onEachFeatureFunction() {
        
            return (feature, layer) => {
                layer.bindTooltip(
                    "<b>magnitude:</b> " + feature.properties.mag + "<br/>" +
                        "<b>place:</b> " + feature.properties.place + "<br/>" +
                        "<b>time:</b> "+ Date(feature.properties.time),{ permanent: false, sticky: true }
                    );
            };
        },
        getLatLng(lat, long) {
            var latLng = [];
            latLng.push(lat, long);
            console.log("latlng: "+latLng)
            return latLng;
        }
    },
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