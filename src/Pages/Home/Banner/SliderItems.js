import React from "react";
import "./SliderItems.css";
const SliderItems = ({ data }) => {
	const { prev, id, next, image, text } = data;
	return (
		<div id={`slide${id}`} className="carousel-item relative   w-full">
			<div className="img-gradient"></div>
			<img alt="slider" src={image} className=" w-full object-cover" />

			<div className="absolute  flex  md:bottom-16 bottom-8 transform -translate-y-1/2  justify-center w-full ">
				<p className="text-bold text-xl text-center   text-gray-200  ">
					{text}
				</p>
			</div>

			<div className="absolute w-full px-5  flex justify-between top-1/2 transform -translate-y-1/2   ">
				<a
					href={`#slide${prev}`}
					className="btn bg-red-500 opacity-60 hover:opacity-100 border-none hover:bg-red-800 btn-circle">
					❮
				</a>
				<a
					href={`#slide${next}`}
					className="btn bg-red-500 opacity-60 hover:opacity-100 border-none hover:bg-red-800 btn-circle">
					❯
				</a>
			</div>
		</div>
	);
};

export default SliderItems;
