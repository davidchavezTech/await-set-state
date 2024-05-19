import { useRef, useState } from 'react';
import './App.css';

import { GlobalProvider, useGlobalContext } from './globalContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
	<GlobalProvider>
		<App />
	</GlobalProvider>
);

function App() {

	const { awaitRerender } = useGlobalContext();
	
	const [ toggle, SetToggle ] = useState(true);
	const [ counter, SetCounter ] = useState(0);

	const buttonElement_ref = useRef();
	
	const handleClick = () => {

		functionOne();
		functionTwo()
		
		async function functionOne() {
			SetToggle(current => !current);
			await awaitRerender();
			console.log('My custom logic 1');
		}
		async function functionTwo() {
			SetCounter(current => current + 1);
			await awaitRerender();
			console.log('My custom logic 2');
			console.log(buttonElement_ref.current.innerText);
		}
	}

	return (
		<div className="App">
			<button
				onClick={handleClick}
				ref={buttonElement_ref}
			>
				{toggle ? 'ON' : 'OFF'} {counter}
			</button>
		</div>
	);
};
