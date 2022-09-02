import { useState } from "react";
import { useGlobalContex } from "../context";

const Search = () => {
	return (
		<div>
			<header className="search-container">
				<form>
					<input
						type="text"
						placeholder="type favourite meal"
						className="form-input"
					/>
					<button type="submit" className="btn">
						search
					</button>
					<button type="button" className="btn btn-hipster">
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
