const get=()=>{
    var inp=document.getElementById("cnammain").value;
    var cname=document.getElementById("cityname");
    var icon=document.getElementById("icons");
    var temp = document.getElementById("curtemp");
    var typelowhigh=document.getElementById("typelowhigh");
    var latlon=document.getElementById("latlon");
    var feels=document.getElementById("feels");
    var humid=document.getElementById("humid");
    var pressure=document.getElementById("pres");
    var wait = document.getElementById("wait");
    //__________________________________________
    var cityname=inp;
    let units="metric";
    var weatherApi="bd74c9dc07e0073dfce454b9a62f3eae";
    var weatherEnd=cityname+"&units="+units+"&APPID="+weatherApi;
    //___________________________________________
    let weatherurl="https://api.openweathermap.org/data/2.5/weather?q="+weatherEnd;
    let forecasturl="https://api.openweathermap.org/data/2.5/forecast?q="+weatherEnd;
    //____________________________________________
    wait.innerHTML="Please wait , Fetching Data";
    fetch(weatherurl).then(
        (res)=>{
            return(res.json());
        }
    )
    .then(
        (res)=>{
            wait.innerHTML="Data Fetched";
            setTimeout(() => {
                wait.innerHTML="";
            }, 2000);
            cname.innerHTML=`${res.name}`;
            icon.src=`http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
            typelowhigh.innerHTML=`
            ${res.weather[0].description}<br><br>
            L: ${Math.floor(res.main.temp_min - 3.5)}&deg;C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; H: ${Math.floor(res.main.temp_max + 4)}&deg;C
            <br><br>
            `;
            temp.innerHTML=`${Math.floor(res.main.temp)}&deg;C`;
            latlon.innerHTML=`lat: ${res.coord.lat}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;long: ${res.coord.lon}  <br><br>`;
            feels.innerHTML=`feels like: ${Math.ceil(res.main.feels_like)}&deg;C  <br>`;
            humid.innerHTML=`humidity: ${res.main.humidity} % <br>`;
            pressure.innerHTML=`pressure: ${res.main.pressure}  <br><br><br><br><br>`;
        }
    )
    .catch(
        ()=>{
            wait.innerHTML="Some error occured , please refresh and try again";
            cname.innerHTML="ERROR";
            temp.innerHTML="??";
            icon.src="";
            icon.alt="ERROR";
            typelowhigh.innerHTML="??";
            latlon.innerHTML="lat: ??  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;long: ??  <br><br>";
            feels.innerHTML="feels like: ??&deg;C  <br>";
            humid.innerHTML="humidity: ?? % <br>";
            pressure.innerHTML="pressure: ??  <br><br><br><br><br>"
            for(let i=1;i<4;i++){
                document.getElementById(`f${i}`).innerHTML="???";
                document.getElementById(`i${i}`).src=``;
                document.getElementById(`i${i}`).alt="ERR";
                document.getElementById(`t${i}`).innerHTML=`??&deg;C  `;
            }
        }
    )
    //______________________________________________________________________________________________________________
    fetch(forecasturl).then(
        (res)=>{
            return(res.json());
        }
    )
    .then(
        (res)=>{
            var count =0;
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const d = new Date();
            for( let i=1;i<20;i=i+8){
                var s=d.getDay()+count;
                if(s>6){
                    s=s-7;
                }
                let day = weekday[s];
                document.getElementById("forecast").innerHTML="3 day forecast<br><br>";
                document.getElementById(`f${count+1}`).innerHTML=day;
                document.getElementById(`i${count+1}`).src=`http://openweathermap.org/img/wn/${res.list[i].weather[0].icon}@2x.png`;
                document.getElementById(`t${count+1}`).innerHTML=`${Math.floor(res.list[i].main.temp)}&deg;C  `;
                count++;
            }
        }
    )
    .catch(
        ()=>{
            document.getElementById("forecast").innerHTML="SOME ERROR OCCURED<br><br>FORECAST NOT AVAILABLE";
            for(let i=1;i<4;i++){
                document.getElementById(`f${i}`).innerHTML="???";
                document.getElementById(`i${i}`).src=``;
                document.getElementById(`i${i}`).alt="ERR";
                document.getElementById(`t${i}`).innerHTML=`??&deg;C  `;
            }
        }
    )
}