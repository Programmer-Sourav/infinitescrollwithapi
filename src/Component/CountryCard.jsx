export default function CountryCard({countryData}){
  const countryDetails = countryData.country;

    return(
        <div> 
           <p><strong>Capital: </strong>{countryDetails.capital}</p>
           <p><strong>Continent: </strong>{countryDetails.continent}</p>
           <p><strong>Full name: </strong>{countryDetails.full_name}</p>
           <p><strong>Currency: </strong>{countryDetails.currency}</p>
           <p><strong>Flag: </strong></p>
           <img src={countryDetails.href.flag} width="128px" height="128px" alt="flagimage"/> 
        </div>
    )
}