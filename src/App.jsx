import "./App.css";
import { useGlobalContex } from "./context";
import Favorites from "./components/Favorites";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import Search from "./components/Search";

function App() {
	const { showModal, favorites } = useGlobalContex();

	return (
		<main>
			<Search />
			{favorites.length > 0 && <Favorites />}
			<Meals />
			{showModal && <Modal />}
		</main>
	);
}

export default App;
