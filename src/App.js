import React from "react";
import Axios from "axios";
import "./style.css";

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.getCountryData=this.getCountryData.bind(this);

  }


  state ={
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    countries : []

  }
 componentDidMount(){
   this.getData();
 }
 async getData(){
  const resApi = await Axios.get("http://covid19.mathdro.id/api");
  const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
        const countries = [];
        for(var i = 0; i < resCountries.data.countries.length; i++){
            countries.push(resCountries.data.countries[i].name);
        
        }
  this.setState({
    confirmed: resApi.data.confirmed.value,
    recovered: resApi.data.recovered.value,
    deaths: resApi.data.deaths.value,
    countries
  });
 }

 async getCountryData(e){
   if (e.target.value === "Worldwide")
   {
    return this.getData();
  
   }
   try{
   const res = await Axios.get(`http://covid19.mathdro.id/api/countries/${e.target.value}`);
   this.setState({
    confirmed: res.data.confirmed.value,
    recovered: res.data.recovered.value,
    deaths: res.data.deaths.value,
  });
 }
 catch(err){
   if(err.response.status === 404)
   this.setState({
    confirmed: "NO DATA",
    recovered: "NO DATA",
    deaths: "NO DATA",
  });
 }
 
 }

 renderCountryOptions(){
     return this.state.countries.map((country,i)=>{
      return  <option key={i}>{country}</option>
     });
}

   render() {
     return (
       <div className="container">
        <h1>Corona update</h1>

        <select className="dropdown" onChange={this.getCountryData}>
        <option>Worldwide</option> 
        {this.renderCountryOptions()}
        </select>

        <div className="flex">
        <div className="box confirmed">
        <h2>Confirmed Cases</h2>
           <h3>{this.state.confirmed}</h3>
        </div> 

        <div className="box recovered">
        <h2>Recovered Cases</h2>
           <h3>{this.state.recovered}</h3>
        </div>

        <div className="box deaths">
           <h2>Deaths</h2>
           <h3>{this.state.deaths}</h3>
        </div>
        </div>
       </div>
     );
   }
  }