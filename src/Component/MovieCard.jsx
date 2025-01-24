import "./movecss.css"

export default function MovieCard({movieData}){

    return(
        <div className="moviecard"> 
         <p><strong>Title: </strong>{movieData.original_title}</p>
         <p><strong>Description: </strong>{movieData.overview}</p>
         <p><strong>Rating: </strong>{movieData.vote_average}</p>
         <p><strong>Image Url: </strong>{movieData.poster_path}</p>
        </div>
    )
}