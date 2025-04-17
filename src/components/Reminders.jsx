import { useState} from "react";
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
