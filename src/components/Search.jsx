import { useState } from "react";
import { useGlobalContex } from "../context";

const Search = () => {
	const [text, setText] = useState("");
	const { setSearchTerm, fetchRandomMeals } = useGlobalContex();

	const handleChange = (e) => {
		setText(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (text) {
			setSearchTerm(text);
			// setText("");
		}
	};

	const handleRandomMeal = () => {
		setSearchTerm("");
		setText("");
		fetchRandomMeals();
	};
	return (
		<div>
			<header className="search-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={text}
						onChange={handleChange}
						placeholder="Please type a favourite meal"
						className="form-input"
					/>
					<button type="submit" className="btn">
						search
					</button>
					<button
						type="button"
						className="btn btn-hipster"
						onClick={handleRandomMeal}
					>
						suprise me!
					</button>
				</form>
			</header>
		</div>
	);
};

export default Search;
<div>
	<h1>Search Component</h1>
</div>;
