
<template>

  <div class="hello" >
  <input type = "text" v-model = "newCity">
        <button class = "btn btn-send" v-on:click = "add()">Добавить</button>
        <select v-model = "city">
            <option v-for="item in cityArr" v-bind:key="item">{{ item }}</option>
        </select>
        <button class = "btn btn-send" v-on:click = "getWeather()">Узнать о погоде</button>
        <button class = "btn btn-send" v-on:click = "getCord()">Мое местоположение</button>
 <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>

        
<div class="card">
       
        <br>
         <h2>{{info.name}}</h2>
        
        <br>
        <h2>{{info.main.temp}}</h2>
        <br>
        <h3>Cкорость ветра:{{ info.wind.speed}}mph</h3>
        
        <div class="sky">
            
            <div class="sun"></div>
            <div class="cloud">
                <div class="circle-small"></div>
                <div class="circle-tall"></div>
                <div class="circle-medium"></div>
            </div>
        </div>
        <table>
            <tr>
                <td>мин.темп</td>
                <td>макс.темп</td>
                <td>темп.ветер</td>
                
            </tr>
            <tr>
                <td>{{info.main.temp_min}}</td>
                <td>{{info.main.temp_max}}</td>
                <td>{{info.wind.deg}} </td>
               
            </tr>
            
        </table>
</div>
        
    </div>
  
  
</template>


<script>
import axios from 'axios'
//import VueGeolocation from 'vue-browser-geolocation'

export default {
 data: function() {
   return{
        info: null,
         city:'',
               newCity:"",
               cityArr: ["London","Rye"],
               latitude:"47",
               longitude:"35",
               London:"London",
                myCoordinates: {
                    lat: 0,
                    lng: 0
                },
               
   }
  },
  mounted: function(){
      this.getCord()
            axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+this.myCoordinates.lat+"&lon="+this.myCoordinates.lng+"&appid=dcb16dd01cccb18cd312750106a9ed04").then((response) =>{
                console.log(response.data);
                console.log(this.myCoordinates.lat);
                console.log(this.myCoordinates.lng);
                this.info = response.data;
            })
           
            },
             methods: {
             getWeather:function(){
               axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + this.city + ",&appid=dcb16dd01cccb18cd312750106a9ed04").then((response) =>{
                    console.log(response.data);
                    this.info = response.data;
                })
            },
            add:function(){
                this.cityArr.push(this.newCity)
            },
            getCord: function () {
                 this.$getLocation({})
                    .then(coordinates => {
                        this.myCoordinates = coordinates;
                    })
                    .catch(error => alert(error));
                         axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+this.myCoordinates.lat+"&lon="+this.myCoordinates.lng+"&appid=dcb16dd01cccb18cd312750106a9ed04").then((response) =>{
                console.log(response.data);
                console.log(this.myCoordinates.lat);
                console.log(this.myCoordinates.lng);
                this.info = response.data;
            })
                    
            },
         
          

        
        },
             
        }
</script>
<style scoped>
body {
    background-color: #F3F3F3;
    font-family: 'Roboto', sans-serif;
}

.card {
    margin: 0 auto;
    margin-top: 5%;
    padding: 5px 30px;
    width: 290px;
    height: 470px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, .2);
    -webkit-animation: open 2s cubic-bezier(.39, 0, .38, 1);
}

@-webkit-keyframes open {
    from {
        padding: 0 30px;
        height: 0;
    }
    to {
        height: 470px;
    }
}

h1,
h3,
h4 {
    position: relative;
}

h1,h2 {
    float: right;
    color: #666;
    font-weight: 300;
    font-size: 6.59375em;
    line-height: .2em;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1) .2s;
}

h2 {
    font-weight: 300;
    font-size: 2.25em;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1);
}

h3 {
    float: left;
    margin-right: 33px;
    color: #777;
    font-weight: 400;
    font-size: 1em;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1) .1s;
}

span {
    margin-left: 24px;
    color: #999;
    font-weight: 300;
}

span span {
    margin-left: 0;
}

.dot {
    font-size: .9em;
}

.sky {
    position: relative;
    margin-top: 108px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #03A9F4;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1) .2s;
}

.sun {
    position: relative;
    top: -3px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #FFEB3B;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1) .5s;
}

.cloud {
    position: absolute;
    top: 60px;
    left: 30px;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1) .7s;
}

.cloud:before,
.cloud:after {
    position: absolute;
    display: block;
    content: "";
}

.cloud:before {
    margin-left: -10px;
    width: 51px;
    height: 18px;
    background: #fff;
}

.cloud:after {
    position: absolute;
    top: -10px;
    left: -22px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 50px -6px 0 6px #fff, 25px -19px 0 10px #fff;
}

table {
    position: relative;
    top: 10px;
    width: 100%;
    text-align: center;
}

tr:nth-child(1) td:nth-child(1),
tr:nth-child(1) td:nth-child(2),
tr:nth-child(1) td:nth-child(3),
tr:nth-child(1) td:nth-child(4),
tr:nth-child(1) td:nth-child(5) {
    padding-bottom: 32px;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1) .7s;
}

tr:nth-child(2) td:nth-child(1),
tr:nth-child(2) td:nth-child(2),
tr:nth-child(2) td:nth-child(3),
tr:nth-child(2) td:nth-child(4),
tr:nth-child(2) td:nth-child(5) {
    padding-bottom: 7px;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1) .9s;
}

tr:nth-child(3) td:nth-child(1),
tr:nth-child(3) td:nth-child(2),
tr:nth-child(3) td:nth-child(3),
tr:nth-child(3) td:nth-child(4),
tr:nth-child(3) td:nth-child(5) {
    padding-bottom: 7px;
    -webkit-animation: up 2s cubic-bezier(.39, 0, .38, 1) .9s;
}

tr:nth-child(2),
tr:nth-child(3) {
    font-size: .9em;
}

tr:nth-child(3) {
    color: #999;
}

@-webkit-keyframes up {
    0% {
        opacity: 0;
        -webkit-transform: translateY(15px);
    }
    50% {
        opacity: 0;
        -webkit-transform: translateY(15px);
    }
    99% {
        -webkit-animation-play-state: paused;
    }
    100% {
        opacity: 1;
    }
}
</style>
