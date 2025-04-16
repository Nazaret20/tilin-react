import "../styles/cardReminders.css";

function CardReminders({ id, emoji, title, interval, onIntervalChange }) {

	const handleChange = (e) => {
		
		onIntervalChange(id, Number(e.target.value));
	};

	return (
		<li className="reminder-card">
			<h2 className="reminder-title">
				{emoji} {title}
			</h2>
			<div className="reminder-settings">
				<span className="interval-label">Recordarme cada:</span>
				<input type="number" className="interval-input" value={interval} onChange={handleChange} />

				<span className="interval-unit">minutos</span>
			</div>
		</li>
	);
}

export default CardReminders;
