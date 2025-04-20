import { useState } from "react";
import '../styles/addReminder.css'

function AddReminder() {
	const [title, setTitle] = useState("");
	const [minutes, setMinutes] = useState(1);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (title.trim() === "" || minutes < 1) return;

		const newReminder = { title, interval: minutes };

		// Emitir un evento personalizado que será escuchado por Reminders
		window.dispatchEvent(new CustomEvent("add-reminder", { detail: newReminder }));

		// Resetear el formulario
		setTitle("");
		setMinutes(1);
	};

	return (
		<form onSubmit={handleSubmit} className="add-reminder-form">
            <p className="add-reminder-p">✌ Añade un recordatorio nuevo:</p>
			<input className="add-reminder-input-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <p className="add-reminder-p">⌚ ¿Cada cuántos minutos hará tilín?</p>

            <input className="add-reminder-input-number" type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} min="1" />

            <button className="add-reminder-button" type="submit">Añadir</button>
		</form>
	);
}

export default AddReminder;
