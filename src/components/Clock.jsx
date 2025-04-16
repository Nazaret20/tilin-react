import { useState, useEffect } from "react";

function Clock() {
	const [time, setTime] = useState("Loading time..."); // Initial static value

	useEffect(() => {
		// Update time only on the client after the component has mounted
		const intervalId = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);

		// Clear the interval on unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div>
			<p>{time}</p>
		</div>
	);
}

export default Clock;
