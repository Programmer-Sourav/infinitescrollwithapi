import "./movecss.css"

export default function MovieCard({movieData}){
 //const imagePath = `https://image.tmdb.org/t/p/w500${imageURL}`
    return(
        <div className="moviecard"> 
         <p><strong>Title: </strong>{movieData.original_title}</p>
         <p><strong>Description: </strong>{movieData.overview}</p>
         <p><strong>Rating: </strong>{movieData.vote_average}</p>
         <img src= {`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} width="auto" height="128px"/>
        </div>
    )
}