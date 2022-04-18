<template>
    <div id="container-wrapper" :class="{show: doShow}"> <!--:style="{width: getContainerWidth}"-->
        <div id="header"> 
           <h1>..__/\/^- earthquake watch -^\/\__.. </h1>
        </div>

        <div id="menue-bar">
      
          <slot name="menue-bar"></slot>
        </div>

        <div id="section-header">
       
          <slot name="section-header"></slot>
        
        </div>
        <div id="forward-backward">
       
          <slot name="forward-backward"></slot>

        </div>
        <div id="content-body"> 
          <slot name="content-body"> Hier kommt Content rein </slot>
        </div> 

    </div>
    <div id="handle" :class="{show: doShow}" @click="showhide">
      <span v-html="arrows"></span>
  </div>
</template>

<script>

export default {
    name: 'Container',
    components: { },
    props: {geojson: Object},
    data: function () {
        return {
            doShow: true,
            arrows: "&laquo;"
        }
    },
    methods: {
        showhide () {
            this.doShow = !this.doShow;
            if (this.doShow) this.arrows = "&laquo;";
            else this.arrows = "&raquo;";
        }
    },
    computed: {
     
    },
}
</script>

<style scoped>
#container-wrapper {
  position: absolute;
  top: 0px;
  left: -33%;
  transition: left 0.1s ease-in;
  z-index: 80;

  width: 33%;
  height: 100%;
  overflow: scroll;

  background-color: white;
  border: 1px solid var(--accent);
  border-radius: 10px;
  opacity: 0.8;
  padding: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}


#container-wrapper.show {
  left: 0px;
  transition: left 0.1s ease-in;
}

#handle {
  cursor: pointer;
  background-color: white;
  border-top: 1px solid #aaa;
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  border-radius: 0 7px 7px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 15px;
  height: 40px;
  line-height: 38px;
  padding: 0 0 0 2px;

  position: fixed;
  top: 50%;
  left: 0%;
  z-index: 70;
  transition: left 0.1s ease-in;
}

#handle:hover {
  background-color: rgba(31, 221, 148, 0.925);
}

#handle.show {
  left: 33%;
  transition: left 0.1s ease-in;
}

#header {
  position: sticky;
  background-color: var(--background);
  border: 1px solid var(--background);
  border-radius: 0px;
  padding: 10px 0 0 10px;
  text-align: center;

  font-size: 0.9vw;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}

#menue-bar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  height: 30px;
  padding: 5px 0 5px 0;

  border-style: solid;
  border-color: var(--accent);
  border-width: 0 0 1px 0;

  background-color: var(--background);

  z-index: 10;
}

#section-header {
    padding-top: 10px;
    padding-bottom: 5px;
}

#section-header .unicon {
    float: left;
    position: relative;
    top: -1px;
    margin-right: 10px;
}

#forward-backward {
  padding-left: 25px;
  padding-right: 25px;

}

#content-body{
    overflow-y: scroll;
    padding: 25px 50px 25px 50px;
}



</style>