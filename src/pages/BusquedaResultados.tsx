import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BusquedaResultados:FC=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const [searchResults,setSearchResults]=useState<Array<unknown> >([]);
    const [areAnyResults,setAreAnyResults]=useState<boolean>(false);
    useEffect(()=>{
        const searchResults=location.state?.searchResults;
        if (!searchResults) {
            navigate("/busqueda");
            return;
        }
        if(Array.isArray(searchResults)&& searchResults.length===0){

            setAreAnyResults(false);
        }else{
            setAreAnyResults(true);
            setSearchResults(searchResults); 
        }
    },[location.state?.searchResults, navigate]);
    
    console.log(location)

    return(
        <>
        {areAnyResults ? (
            <>
            There are areResultsOk
            <section>
                <pre>{JSON.stringify(searchResults)}</pre>
            </section>
            </>
        ):(
            <>There are no results</>
        )}
            BusquedaResultados
        </>
    )
}
export default BusquedaResultados;