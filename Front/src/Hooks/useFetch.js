import { useEffect, useState } from "react"


const useFetch = (url) => {

        const [state, setState] = useState({ data:null,  error: null});

        useEffect(() => {

            
            fetch(url)
                .then(resp => resp.json())
                .then((data, error) => {

                    if(error) {
                    setState({
                        error:null,
                        data
                    })
                } else if (data) {

                    setState({
                        error,
                        data: null
                    })

                }
            })
        },[url])

        return state;
    
}

export default useFetch;