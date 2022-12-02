import React from "react";
import img1 from "../../assets/images/slide/recipe-1.jpg";
import img2 from "../../assets/images/slide/recipe-2.jpg";
import img3 from "../../assets/images/slide/recipe-3.jpg";
import img4 from "../../assets/images/slide/recipe-4.jpg";
import SliderItems from "./SliderItems";

const SliderData = [
	{
		image: img1,
		prev: 4,
		id: 1,
		next: 2,
		text: "The Best Bites of the Year According to Food & Burger Restaurant",
	},
	{
		image: img2,
		prev: 1,
		id: 2,
		next: 3,
		text: "The Winning Weeknight Dinner We’re Making Daily",
	},
	{
		image: img3,
		prev: 2,
		id: 3,
		next: 4,
		text: "Roasted Brussels Sprouts With Bacon & Balsamic",
	},
	{
		image: img4,
		prev: 3,
		id: 4,
		next: 1,

		text: "Make This Pasta for ‘My Brilliant Friend’",
	},
];

const Slider = () => {
	return (
		<div className="carousel h-[600px] mt-8 mb-10 overflow-hidden rounded-lg w-full">
			{SliderData.map(data => (
				<SliderItems key={data.id} data={data} />
			))}
		</div>
	);
};

export default Slider;
