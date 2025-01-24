import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"

export default function InfiniteScroll(){

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)


    const fetchMovies = async () =>{
        const URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        const data = await axios.get(URL, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGJkY2NiZGFiODZiN2MxNTYwYTI5MDk3NzllN2Y3ZSIsIm5iZiI6MTczNzcxNDk3MS4xMDQsInN1YiI6IjY3OTM2ZDFiMzlkYTEzZjRjYjQ4MjQzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9TSRaTYi6f9PfQCV9acv8MErJjnxbcajXjHtnklrRLg", //environment variable
            Accept: "application/json",
          },
        });
        setData((prevData) => [...prevData, ...data.data.results]); // we are going to add the new data to current data.
        setLoading(false);
    }
  
    const length = data.length;

    useEffect(()=>{
        fetchMovies()
    }, [page])


    const handleScroll = () =>{
        if(document.body.scrollHeight - 300 < window.scrollY + window.innerHeight){
            setLoading(true);
        }
    }

    const debounce = (handleScrollFn, delay) =>{
        let timerId = null;
        return function (...args){
            if(timerId){
                clearTimeout(timerId);
            }
            timerId = setTimeout(()=>{
                handleScrollFn(...args)
            }, delay)      
        }  
    }

    useEffect(()=>{
        if(loading== true){
            setPage((prevPage)=>prevPage + 1)
        }
    }, [loading])

    window.addEventListener("scroll", debounce(handleScroll, 500))

    return(
        <div> 
         {length && data.map((dataItem)=>(
            <MovieCard movieData={dataItem}/>
         ))}
        </div>
    )
}