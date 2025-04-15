import "../styles/toggle.css";
import { useState, useEffect } from "react";

function Toggle() {
	const [isActive, setIsActive] = useState(false);

	const handleChange = () => {
		setIsActive((prev) => {
			const newState = !prev;
			localStorage.setItem("theme", newState ? "light" : "dark");
			return newState;
		});
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setIsActive(savedTheme === "light");
		} else {
			setIsActive(false);
		}
	}, []);

	useEffect(() => {
		if (isActive) {
			document.body.classList.add("light");
			document.body.classList.remove("dark");
		} else {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
		}
	}, [isActive]);

	return (
		<div className="theme-toggle">
			<input type="checkbox" id="toggle-theme" checked={isActive} onChange={handleChange} />
			<label htmlFor="toggle-theme">
				<span className={`moonSun ${isActive ? "sun" : "moon"}`}></span>
			</label>
		</div>
	);
}

export default Toggle;
