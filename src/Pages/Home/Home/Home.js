import React from "react";
import useTitle from "../../../Hooks/useTitle";
import AboutUs from "../About-us/AboutUs";
import Slider from "../Banner/Slider";
import HomeRecipes from "../HomeRecipes/HomeRecipes";
import Subscribe from "../Subscribe/Subscribe";

const Home = () => {
	useTitle("Home");
	return (
		<div>
			<Slider />
			<AboutUs />
			<HomeRecipes />
			<Subscribe />
		</div>
	);
};

export default Home;
