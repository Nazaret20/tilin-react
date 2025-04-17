import { useState, useEffect } from "react";
import "../styles/cardReminders.css";

function CardReminders({ id, emoji, title, interval, onIntervalChange }) {
	const [isHighlighted, setIsHighlighted] = useState(false);

	useEffect(() => {
		if (interval <= 0) return;

		const timerId = setInterval(() => {
			const audio = new Audio("tilin-tilin.mp3");
			audio.play();

			setIsHighlighted(true);
			
			setTimeout(() => setIsHighlighted(false), 1000);
		}, interval * 60 * 1000); // minutos → ms

		return () => clearInterval(timerId);
	}, [interval]);

	const handleChange = (e) => {
		const newValue = Number(e.target.value);
		if (!isNaN(newValue) && newValue >= 1) {
			onIntervalChange(id, newValue);
		} else {
			onIntervalChange(id, 1);
		}
	};
	return (
		<li className={`reminder-card ${isHighlighted ? "highlight" : ""}`}>
			<h2 className="reminder-title">
				{emoji} {title}
			</h2>
			<div className="reminder-settings">
				<span className="interval-label">Recordarme cada:</span>
				<input type="number" min="1" className="interval-input" value={interval} onChange={handleChange} />

				<span className="interval-unit">{interval === 1 ? "minuto" : "minutos"}</span>
			</div>
		</li>
	);
}

export default CardReminders;
