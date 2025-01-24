import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchCountries } from "../redux/ThunkFunction";
import CountryCard from "./CountryCard";

export default function InfinfiteScrollRedux(){
    const  countries = useSelector((state)=>state.countries.countries)
    const  isLoading = useSelector((state)=>state.countries.isLoading)
    const dispatch = useDispatch();
    const [startIndex, setStartIndex] = useState(1);
    const [endIndex, setEndIndex] = useState(5);
  
    // useEffect(()=>{
    //     dispatch(fetchCountries({startIndex, endIndex}))
    // }, [startIndex, endIndex])

    // const handleScroll = () =>{
    //     console.log(1122, "HS")
    //   if(document.body.scrollHeight - 300 < window.scrollY + window.innerHeight){
    //     console.log("Inside HandS", startIndex, endIndex)
    //      setStartIndex(startIndex+5);
    //      setEndIndex(endIndex+5)
    //   }
    // }

    // const debounce = (handleScrollFn, delay) =>{
    //     let timerId = null;
    //     return function (...args){
    //         if(timerId){
    //             clearTimeout(timerId);
    //         }
    //         timerId = setTimeout(()=>{
    //             console.log(111, "TO");
    //             handleScrollFn(...args)
    //         }, delay)      
    //     }  
    // }

    // useEffect(()=>{
    //     window.addEventListener("scroll", debounce(handleScroll, 500))
    //     console.log(5555, countries.length);
    // }, [])
  
    // Debounce function (outside useEffect to maintain scope)
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), delay);
    };
  };

  // Scroll Handler
  const handleScroll = useCallback(() => {
    if (
      document.documentElement.scrollHeight - window.innerHeight - window.scrollY <
        300 &&
      !isLoading
    ) {
      setStartIndex((prevStartIndex) => prevStartIndex + 5);
      setEndIndex((prevEndIndex) => prevEndIndex + 5);
      console.log(666, startIndex, endIndex)
    }
  }, [isLoading]);

  // Debounced Scroll Handler
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 500), [
    handleScroll,
  ]);

  // Effect to fetch data
  useEffect(() => {
    dispatch(fetchCountries({ startIndex, endIndex }));
  }, [dispatch, startIndex, endIndex]);

  // Effect to attach and clean up the event listener
  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  

    return(
        <div> 
            <h1>Infinte Scroll with Redux</h1>
            {
                countries.map((country)=>(
                    <CountryCard  countryData={country}/>
                ))
            }

        </div>
    )
}