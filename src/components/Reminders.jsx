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
		if (newValue <= 0) return;
		setReminders((prev) => prev.map((reminder) => (reminder.id === id ? { ...reminder, interval: newValue } : reminder)));
	};

	useEffect(() => {
		// Escuchar el evento add-reminder
		const handleAddReminder = (event) => {
			const newReminder = event.detail;

			// Generar un ID único
			const newId = Math.max(...reminders.map((r) => r.id), 0) + 1;

			// Añadir un emoji aleatorio
			const emojis = ["⏰", "📝", "✅", "🔔", "📌", "🎯"];
			const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

			// Crear el nuevo recordatorio completo
			const reminderToAdd = {
				id: newId,
				emoji: randomEmoji,
				title: newReminder.title,
				interval: newReminder.interval,
			};

			// Añadir el nuevo recordatorio a la lista
			setReminders((prevReminders) => [...prevReminders, reminderToAdd]);
		};
		// Registrar el listener
		window.addEventListener("add-reminder", handleAddReminder);

		// Limpiar el listener al desmontar
		return () => {
			window.removeEventListener("add-reminder", handleAddReminder);
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
