import { useState, useEffect } from "react";
import '../styles/global.css'

function Motivation() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		const handler = (event) => {
			setMessage(event.detail);
		};

		window.addEventListener("motivation-message", handler);
		return () => window.removeEventListener("motivation-message", handler);
	}, []);
	return <p className="motivation">{message}</p>;
}

export default Motivation;
