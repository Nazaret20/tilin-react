import { useState, useEffect } from "react";
import "../styles/cardReminders.css";

function CardReminders({ id, emoji, title, interval, onIntervalChange }) {
	const [isHighlighted, setIsHighlighted] = useState(false);

	useEffect(() => {
		const motivationMessages = [
			"¡Buen trabajo! Acabas de completar tu recordatorio de",
			"¡Lo lograste! Has hecho tu hábito de",
			"¡Sigue así! ¡Estás completando tus hábitos de",
			"¡Increíble! Acabas de hacer tu recordatorio de",
			"¡Genial! Terminaste tu hábito de",
		];

		if (interval <= 0) return;

		const timerId = setInterval(() => {
			const audio = new Audio("tilin-tilin.mp3");
			audio.play();



			const randomMessage = motivationMessages[Math.floor(Math.random() * motivationMessages.length)] + ` ${title.toLowerCase()}.`;

			window.dispatchEvent(new CustomEvent("motivation-message", { detail: randomMessage }));

			setIsHighlighted(true);
			setTimeout(() => setIsHighlighted(false), 1000);
		}, interval * 60 * 1000);

		return () => clearInterval(timerId);
	}, [interval, title]);

	// useEffect(() => {
	// 	const isTesting = true; // 🔁 Cambia a false para uso normal
	// 	const motivationMessages = [
	// 		"¡Buen trabajo!",
	// 		"¡Sigue así!",
	// 		"¡Lo estás haciendo genial!",
	// 		"¡Eres increíble!",
	// 		"¡Estás formando un gran hábito!",
	// 		"¡Súper logrado!",
	// 		"¡Paso a paso lo consigues!",
	// 		"¡Orgulloso/a de ti!",
	// 	];

	// 	if (interval <= 0) return;

	// 	const delay = isTesting
	// 		? interval * 1000 // segundos
	// 		: interval * 60 * 1000; // minutos

	// 	const timerId = setInterval(() => {
	// 		const audio = new Audio("tilin-tilin.mp3");
	// 		audio.play();

	// 		const randomMessage =
	// 		motivationMessages[Math.floor(Math.random() * motivationMessages.length)];

	// 		window.dispatchEvent(
	// 			new CustomEvent("motivation-message", { detail: randomMessage })
	// 		);

	// 		setIsHighlighted(true);
	// 		setTimeout(() => setIsHighlighted(false), 1000);
	// 	}, delay);

	// 	return () => clearInterval(timerId);
	// }, [interval]);

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
