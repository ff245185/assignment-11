import React, { useEffect } from "react";
import AOS from "aos";
import { Link, useLoaderData } from "react-router-dom";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import useTitle from "../../Hooks/useTitle";
import "./Recipes.css";
const Recipes = () => {
	const recipes = useLoaderData();
	useTitle("All_Recipes");
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div>
			<div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 mt-10 mb-10">
				{recipes.map(recipe => (
					<div className="recipesAnimationContainer" key={recipe._id}>
						<div data-aos="fade-up" className="recipesAnimation p-1">
							<div className="bg-gray-100 relative z-50 h-full  ">
								<PhotoProvider>
									<PhotoView src={recipe.img}>
										<img
											className="border-b-2  md:h-[300px] w-full cursor-pointer border-gray-400"
											src={recipe.img}
											alt=""
										/>
									</PhotoView>
								</PhotoProvider>

								<div className="px-2 pb-16 pt-4">
									<Link to={`/recipe/${recipe._id}`}>
										<h1
											title="Click for Food details"
											className="text-gray-900 text-sm sm:text-xl text-center font-bold transition-all hover:text-red-500">
											{recipe.title}
										</h1>
									</Link>
									<p className="text-gray-700 pt-4 text-justify ">
										{recipe.details.slice(0, 100)}...
									</p>
								</div>
								<div className="pt-6 pb-2  absolute bottom-0 w-full">
									<p className="uppercase px-4 border-t flex items-center justify-between border-gray-400 border-b py-2  text-black text-sm font-bold">
										<span>Food |</span>{" "}
										<Link
											to={`/recipe/${recipe._id}`}
											title="Food Details"
											className="text-xl text-red-500 hover:text-red-600 transition-all  font-bold">
											{" "}
											<BsBoxArrowInUpRight />
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Recipes;
