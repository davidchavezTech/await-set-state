import { createContext, useContext, useEffect, useRef, useState } from "react";

const GlobalsContext = createContext();

export function GlobalProvider(props) {

    const [ rerendered, SetRerender ] = useState(0);
    const resolve_ref = useRef([]);

	const awaitRerender = () => {
		return new Promise(resolve => {
			resolve_ref.current.push(resolve);
			SetRerender(current => current + 1);
		})
	}

    useEffect(() => {
		if(!resolve_ref.current.length) return;

		resolve_ref.current.forEach(resolve => resolve());
		resolve_ref.current = [];
	}, [rerendered])
    
    const value = {
        awaitRerender
    }

    return <GlobalsContext.Provider value={value} {...props} />;
};

export function useGlobalContext() {
    const context = useContext(GlobalsContext);
    if(!context) {
        throw new Error('Redirect context must be inside of RedirectContext provider');
    }
    return context
}
