import "../styles/cardReminders.css";

function CardReminders({ id, emoji, title, interval, onIntervalChange }) {
	const handleChange = (e) => {
		// Tomamos el valor como string y eliminamos cualquier cero a la izquierda
		let newValue = e.target.value.trim().replace(/^0+/, "");

		// Si el valor es vacío o menor a 1, lo setearíamos como 1
		if (newValue === "" || Number(newValue) <= 0) {
			newValue = "1"; // Establecemos el valor por defecto a 1 minuto si no es válido
		}

		// Llamamos a la función en el componente padre para actualizar el intervalo
		onIntervalChange(id, Number(newValue));
	};

	const minuteText = interval === 1 ? "minuto" : "minutos";

	return (
		<li className="reminder-card">
			<h2 className="reminder-title">
				{emoji} {title}
			</h2>
			<div className="reminder-settings">
				<span className="interval-label">Recordarme cada:</span>
				<input type="number" className="interval-input" value={interval} onChange={handleChange} />

				<span className="interval-unit">{minuteText}</span>
			</div>
		</li>
	);
}

export default CardReminders;
