import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealsUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesFromLocalStorage = () => {
	let favorites = localStorage.getItem("favorites");
	if (favorites) {
		favorites = JSON.parse(localStorage.getItem("favorites"));
	} else {
		favorites = [];
	}
	return favorites;
};

const AppProvider = ({ children }) => {
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [selectedMeal, setSelectedMeal] = useState(null);
	const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage);

	const fetchMeals = async (url) => {
		setLoading(true);
		try {
			//Get a specific property from api
			const { data } = await axios(url);
			if (data.meals) {
				setMeals(data.meals);
			} else {
				setMeals([]);
			}
		} catch (error) {
			console.log(error.response);
		}
		setLoading(false);
	};

	const addToFavorites = (idMeal) => {
		console.log(idMeal);
		const meal = meals.find((meal) => meal.idMeal === idMeal);
		const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
		if (alreadyFavorite)
			return alert("This meal is already in your favorite lists.");
		const updatedFavorites = [...favorites, meal];
		setFavorites(updatedFavorites);
		localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
	};

	const removeFromFavorites = (idMeal) => {
		const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
		setFavorites(updatedFavorites);
		localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
	};

	useEffect(() => {
		fetchMeals(allMealsUrl);
	}, []);

	useEffect(() => {
		if (!searchTerm) return;
		fetchMeals(`${allMealsUrl}${searchTerm}`);
	}, [searchTerm]);

	const fetchRandomMeals = () => {
		fetchMeals(randomMealsUrl);
	};

	const selectMeal = (idMeal, favoriteMeal) => {
		let meal;
		if (favoriteMeal) {
			meal = favorites.find((meal) => meal.idMeal === idMeal);
		} else {
			meal = meals.find((meal) => meal.idMeal === idMeal);
		}
		setSelectedMeal(meal);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};
	return (
		<AppContext.Provider
			value={{
				loading,
				meals,
				setSearchTerm,
				fetchRandomMeals,
				showModal,
				selectMeal,
				selectedMeal,
				closeModal,
				favorites,
				addToFavorites,
				removeFromFavorites,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContex = () => {
	return useContext(AppContext);
};
export { AppContext, AppProvider };
