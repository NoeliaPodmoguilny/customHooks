import { useEffect, useState } from "react"

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
    });
    const apiKey = 'rJHOF5fGNue85QZl7C+IoQ==Wf5wIhX2db8GW2G7';
    
    const getFecth = async () => {
        setState({
            ...state,
            isLoading: true,
        });
        
        const resp = 
            await fetch(
                    url, {
                    headers: 
                        { 'X-API-Key': apiKey }
                    });

        const data = await resp.json();
        // console.log(data);

        setState({
            data,
            isLoading: false,
            hasError: null,
        });
    }

    const onInput = () => {
        setState(getFecth)
    };

        useEffect(() => {
            getFecth()
        }, [url]);
        

    return{
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        onInput
    }
}
