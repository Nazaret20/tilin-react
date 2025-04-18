import { useState, useEffect } from "react";
import '../styles/global.css'

function Clock() {
	const [time, setTime] = useState("Loading time...");

	useEffect(() => {

		const intervalId = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div>
			<p className="clock">{time}</p>
		</div>
	);
}

export default Clock;
