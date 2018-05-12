import axios from "@/core/uilts/axios";

const getNow = () =>{
    return axios({
        url:`https://free-api.heweather.com/s6/weather/now?location=auto_ip&key=0e14101421a04d74860b1383b88fca2f`,
        method:'GET'
    })
}