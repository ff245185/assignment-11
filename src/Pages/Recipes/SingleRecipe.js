import React, { useContext, useEffect, useState } from "react";
import { BsBoxArrowUpLeft } from "react-icons/bs";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useTitle from "../../Hooks/useTitle";
import toast from "react-hot-toast";
import Review from "../Review/Review";
const SingleRecipe = () => {
	const { user } = useContext(AuthContext);
	const [review, setReview] = useState(false);
	const { id } = useParams();
	const [recipe, setRecipe] = useState({});
	const { img, title, price, ratings, details, _id } = recipe;

	useEffect(() => {
		fetch(` https://food-masty-server.vercel.app/recipes/${id}`)
			.then(res => res.json())
			.then(result => setRecipe(result));
	}, [id]);
	useTitle("Recipe_Details");

	// date format
	function formatDate(date) {
		const yyyy = date.getFullYear();
		let mm = date.getMonth() + 1;
		let dd = date.getDate();
		if (dd < 10) dd = "0" + dd;
		if (mm < 10) mm = "0" + mm;
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		let strTime =
			hours + ":" + minutes + " " + ampm + " " + dd + "/" + mm + "/" + yyyy;
		return strTime;
	}
	const currentDate = formatDate(new Date());

	const handleReview = async e => {
		e.preventDefault();
		const form = e.target;
		const message = form.message.value;
		const userImg = user.photoURL;
		const email = user.email;
		const name = form.name.value;
		const star = form.star.value;
		const review = {
			message,
			star,
			email,
			name,
			userImg,
			title,
			recipeImg: img,
			reviewId: _id,
			date: currentDate,
		};

		fetch(" https://food-masty-server.vercel.app/review", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(review),
		})
			.then(res => res.json())
			.then(data => {
				if (data.acknowledged) {
					toast.success("Your review is posted !");
					form.reset();
				}
			});
	};
	return (
		<div className="my-8 lg:flex gap-8">
			<div className=" lg:w-3/4 mx-auto  md:1/2 sm:w-3/4">
				<div className="rounded-lg recipesAnimationContainer ">
					<div className="recipesAnimation  p-1">
						<div className="relative z-50">
							<img className="max-h-[500px] w-full" src={img} alt="" />
							<div className="pt-4  bg-white border-t-2 px-4 pb-4 border-gray-500">
								<div className="text-gray-800">
									<p>Price: ${price}</p>
									<p>Ratings: {ratings}</p>
								</div>
								<h1 className="text-gray-900 pb-4 sm:text-xl text-sm text-center font-bold transition-all hover:text-red-500">
									{title}
								</h1>
								<p className="text-gray-800 text-justify">{details}</p>
								<div className="mt-3 flex justify-end">
									<Link
										title="See All Recipes."
										to="/recipes"
										className="text-red-500 text-2xl">
										{" "}
										<BsBoxArrowUpLeft />
									</Link>
								</div>
							</div>

							<div className="px-4 pt-3 lg:block   bg-white hidden mt-1">
								<div
									title="Click for review"
									className="cursor-pointer text-red-500  hover:text-gray-900 pb-2 font-bold"
									onClick={() => setReview(!review)}>
									{review ? undefined : (
										<button className="mb-3 flex items-center gap-2 justify-between w-full  ">
											Add Review{" "}
											<FaCommentDots className="mt-2 text-blue-600 hover:text-red-600" />
										</button>
									)}
								</div>
								<div>
									{" "}
									{review && (
										<>
											{user?.email ? (
												<form onSubmit={handleReview}>
													<div className="flex justify-between items-center pr-6">
														<h1 className="text-gray-900 uppercase font-semibold pb-3">
															give a review
														</h1>
														<span
															title="Hide from"
															className="cursor-pointer"
															onClick={() => setReview(!review)}>
															<FaTimes />
														</span>
													</div>
													<textarea
														className="w-full px-4 py-2 outline-none focus:border-red-500 border-2 bg-white"
														name="message"
														required
														id=""
														placeholder="Your Feedback......"
														cols="30"
														rows="5"></textarea>

													<input
														name="star"
														min="1"
														max="5"
														maxlength="1"
														required
														type="number"
														className="w-full px-4 py-2 md:mb-0  mt-1 outline-none focus:border-red-500 border-2 bg-white"
														placeholder="Give Star*"
													/>

													<div className="md:flex py-3 gap-8 ">
														<input
															name="name"
															defaultValue={user.displayName}
															required
															type="text"
															className="w-full px-4 py-2 md:mb-0 mb-3 outline-none focus:border-red-500 border-2 bg-white"
															placeholder="Your Name*"
														/>
														<input
															defaultValue={user.email}
															readOnly
															required
															type="text"
															className="w-full px-4 py-2 outline-none focus:border-red-500 border-2 bg-white"
															placeholder="Your Email*"
														/>
													</div>
													<input
														className="cursor-pointer bg-red-600 py-2 px-6 inline-block  mb-5 mt-2 rounded hover:bg-gray-900 transition-all text-white"
														type="submit"
														value="Post Review"
													/>
												</form>
											) : (
												<div className="pb-3 font-bold text-gray-800">
													if you want to give a review please before
													<Link className="text-red-500 ml-2" to="/signin">
														login Now
													</Link>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="lg:w-1/4 mx-auto md:1/2 sm:w-3/4">
				{" "}
				<Review id={_id} />
			</div>
			<div className="px-4 lg:hidden block mt-8">
				<div
					title="Click for review"
					className="text-gray-200 hover:text-red-500 text-center font-bold"
					onClick={() => setReview(!review)}>
					{review ? undefined : (
						<button className="mb-3 flex justify-center gap-2 w-full">
							Add Review <FaCommentDots className="  mt-2 " />
						</button>
					)}
				</div>
				<div>
					{" "}
					{review && (
						<>
							{user?.email ? (
								<form onSubmit={handleReview}>
									<div className="flex justify-between items-center pr-6">
										<h1 className="text-gray-200 uppercase font-semibold pb-3">
											give a review
										</h1>
										<span
											title="Hide from"
											className="cursor-pointer"
											onClick={() => setReview(!review)}>
											<FaTimes />
										</span>
									</div>
									<textarea
										className="w-full px-4 py-2 outline-none focus:border-red-500 border-2 bg-white"
										name="message"
										required
										id=""
										placeholder="Your Feedback......"
										cols="30"
										rows="5"></textarea>
									<input
										name="star"
										required
										type="number"
										className="w-full px-4 py-2 md:mb-0  mt-1 outline-none focus:border-red-500 border-2 bg-white"
										placeholder="Give Star*"
									/>
									<div className="md:flex py-3 gap-8 ">
										<input
											name="name"
											defaultValue={user.displayName}
											required
											type="text"
											className="w-full px-4  py-2 md:mb-0 mb-3 outline-none focus:border-red-500 border-2 bg-white"
											placeholder="Your Name*"
										/>
										<input
											defaultValue={user.email}
											readOnly
											required
											type="text"
											className="w-full px-4 py-2 outline-none focus:border-red-500 border-2 bg-white"
											placeholder="Your Email*"
										/>
									</div>
									<input
										className="cursor-pointer bg-red-600 py-2 px-6 inline-block  mb-5 mt-2 rounded hover:bg-gray-900 transition-all text-white"
										type="submit"
										value="Post Review"
									/>
								</form>
							) : (
								<div className="pb-3 font-bold text-gray-200 text-center">
									if you want to give a review Please before
									<Link className="text-red-500 ml-2" to="/signin">
										login Now
									</Link>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default SingleRecipe;
