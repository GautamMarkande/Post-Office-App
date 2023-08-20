const yourIpis =document.getElementById("ipAddress");
const latatitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const City = document.getElementById("city");
const Region = document.getElementById("region");
const organization = document.getElementById("organization");
const hostname =document.getElementById("hostname");
const iframe = document.getElementById("iframeMap");
const timezone = document.getElementById("timezone");
const dateTime = document.getElementById("dateTime");
const pincode =document.getElementById("pincode");
const message = document.getElementById("message");
const mainpageIp = document.getElementById("ip");
const timezoneapikey = "404c8b2f65924af19cc032257641aee7"
const getStartbtn = document.getElementById("btn");
const inputtext = document.getElementById("input");

getStartbtn.addEventListener("click", ()=>{
    const mainpage = document.getElementById("main");
    mainpage.style.display="none";
    const informationpage = document.getElementById("information_page");
    informationpage.style.display = "flex"
})
function searchPostOffice(gridItems){
    items = Array.from(gridItems);
   console.log(items[0].firstElementChild.firstElementChild.innerText.trim().toLowerCase());
    inputtext.addEventListener("input",()=>{
        let searchText = inputtext.value.trim().toLowerCase();
        items.forEach((item)=>{
            const name = item.firstElementChild.firstElementChild.innerText.trim().toLowerCase();
            if(!name.includes(searchText)){
                item.style.display="none";
            }else{
                item.style.display="flex";
            }
        })

    })

}
async function GetTimeZoneInfo(timezone){
    const response = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${timezoneapikey}&tz=America/Los_Angeles`, {method:"GET"});
    const result = await response.json();
    return result;
}
async function showDataOntoUI(Data){
    const {ip,city,org,postal, region ,timezone,loc} = Data;
    const lat = loc.split(",")[0];
    const long = loc.split(",")[1];
    latatitude.innerText = `${lat}`;
    longitude.innerText = `${long}`;
    yourIpis.innerText =`Your ip Address is:${ip}`;
    City.innerText =`${city}`;
    Region.innerText =`${region}`
    organization.innerText =`${org}`;
    pincode.innerText=`${postal}`;
    timezone.innerText=`${timezone}`;
    const timeZoneInfo = await GetTimeZoneInfo(timezone)
   // console.log(timeZoneInfo);
    dateTime.innerText = timeZoneInfo.date_time_txt;
    iframe.src = `https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed`;
    const postalData = await getPostalData(postal);
    //console.log(postalData[0]);
    const Numberofmsgs = postalData[0].Message;
    
    message.innerText = `${Numberofmsgs}`;
    const postoffices = postalData[0].PostOffice;
    //console.log(postoffices)
    const grid = document.getElementById("grid");
    postoffices.forEach((postoffice)=>{
        
        const {Name,BranchType, DeliveryStatus, District, Division} = postoffice;
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML =`<h2>Name: <p>${Name}</p></h2>
        <h2>Brach type: <p>${BranchType}</p></h2>
        <h2>Delivery Status: <p>${DeliveryStatus}</p></h2>
        <h2>District: <p>${District}</p></h2>
        <h2>Division: <p>${Division}</p></h2>
        `
        grid.appendChild(card);
    })
    
    searchPostOffice(grid.children);

}
async function getPostalData(PINCODE){
    const response = await fetch(`https://api.postalpincode.in/pincode/${PINCODE}`,{method:"GET"});
    const result = await response.json();
    return result;
}
async function getIpAddressOfDevice(){
    const response = await fetch('https://api.ipify.org?format=json' ,{method:"GET"})
    const result = await response.json();
    const IP = result.ip;
    mainpageIp.innerText = `${IP}`;
    getInformationOfIp(IP);
    //console.log(result.ip);
}

//https://ipinfo.io/8.8.8.8/json?token=d7313733ecdc07
async function  getInformationOfIp(IP){
   const baseurl =  `http://api.ipstack.com/${IP}`;
    const apikey = "5124dc3f91dc7e41c8d38c38ed3790a9"
    //const inforespose = await fetch(`${baseurl}?access_key=${apikey}`, {method:"GET"});
    const inforespose= await fetch(`http://ipinfo.io/${IP}/json?token=d7313733ecdc07`);
    const infoResult = await inforespose.json();
    showDataOntoUI(infoResult);
   // console.log(infoResult);
}
getIpAddressOfDevice();