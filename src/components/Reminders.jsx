import { useState, useEffect } from "react";
import CardReminders from "./CardReminders";

function Reminders() {
	const [reminders, setReminders] = useState([
		{ id: 1, emoji: "💧", title: "Beber agua", interval: 40 },
		{ id: 2, emoji: "🙆‍♂️", title: "Estirarse", interval: 20 },
		{ id: 3, emoji: "🧘", title: "Respirar profundo", interval: 30 },
		{ id: 4, emoji: "🚶‍♀️", title: "Mover las piernas", interval: 150 },
	]);

	const handleIntervalChange = (id, newValue) => {
		console.log("Intervalo actualizado:", id, newValue);
		if (newValue <= 0) {
			alert("El intervalo debe ser mayor que 0 minutos.");
			return;
		}

		setReminders((prev) => prev.map((reminder) => (reminder.id === id ? { ...reminder, interval: newValue } : reminder)));
	};

	useEffect(() => {
		// Solicitar permisos de notificación solo si no se ha concedido
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}

		// Limpiar intervalos al desmontar el componente
		const intervalIds = [];

		// Establece un intervalo de tiempo para cada recordatorio
		reminders.forEach((reminder) => {
			const intervalId = setInterval(() => {
				// Al cumplirse el tiempo, mostramos una notificación
				new Notification("¡Es hora de " + reminder.title + "!", {
					body: reminder.title + " ha llegado el momento",
				});

				// Reproducir sonido una sola vez
				const audio = new Audio("/tilin-tilin.mp3"); // Reemplaza con la ruta de tu archivo de sonido
				audio.play(); // Solo suena una vez
			}, reminder.interval * 60 * 1000); // Multiplicamos por 60,000 para convertir minutos a milisegundos

			// Guardar el ID del intervalo
			intervalIds.push(intervalId);
		});

		// Limpiar los intervalos cuando el componente se desmonte
		return () => {
			intervalIds.forEach((intervalId) => clearInterval(intervalId));
		};
	}, [reminders]);

	return (
		<ul>
			{reminders.map((reminder) => (
				<CardReminders
					key={reminder.id}
					id={reminder.id}
					emoji={reminder.emoji}
					title={reminder.title}
					interval={reminder.interval}
					onIntervalChange={handleIntervalChange}
				/>
			))}
		</ul>
	);
}
export default Reminders;
