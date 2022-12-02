import React from "react";
import Swal from "sweetalert2";
import useTitle from "../../Hooks/useTitle";
const AddRecipe = () => {
	useTitle("Add_Recipe");
	const addRecipe = e => {
		e.preventDefault();
		const form = e.target;
		const recipeName = form.recipeName.value;

		const description = form.description.value;
		const price = form.price.value;
		const ratings = form.ratings.value;
		// const recipe = {
		// 	title: recipeName,
		// 	img: recipePhotoUrl,
		// 	price: parseInt(price),
		// 	ratings: ratings,
		// 	details: description,
		// };

		// fetch(` https://food-masty-server.vercel.app/recipes`, {
		// 	method: "POST",
		// 	headers: {
		// 		"content-type": "application/json",
		// 	},
		// 	body: JSON.stringify(recipe),
		// })
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		if (data.acknowledged) {
		// 			Swal.fire({
		// 				position: "top-center",
		// 				icon: "success",
		// 				title: "Recipe Added Successfully",
		// 				showConfirmButton: false,
		// 				timer: 1500,
		// 			});
		// 			form.reset();
		// 		}
		// 	});
		const image = form.image.files[0];
		const formData = new FormData()
		formData.append('image', image)
		console.log(formData);
		const url = 'https://api.imgbb.com/1/upload?key=0ddea17d62c9c450d95fa4f0d6cf6943'
		fetch(url, { method: 'POST', body: formData }).then(res => res.json()).then(data => {
			console.log(data);
		})
	};
	return (
		<div className="my-10  ">
			<form onSubmit={addRecipe}>
				<div className="relative z-0 mb-6 w-full group">
					<input
						type="text"
						name="recipeName"
						id="recipeName"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="recipeName"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Recipe Name
					</label>
				</div>

				<div className="relative z-0 mb-6 w-full group">
					<textarea
						type="text"
						name="description"
						id="description"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="description"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Recipe Description
					</label>
				</div>
				<div className="relative z-0 mb-6 w-full group">
					<input
						type="file"
						name="image"
						id="recipePhotoUrl"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="recipePhotoUrl"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Recipe Photo Url
					</label>
				</div>
				<div className="grid md:grid-cols-2 md:gap-6">
					<div className="relative z-0 mb-6 w-full group">
						<input
							type="text"
							name="price"
							id="price"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							htmlFor="price"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Recipe Price
						</label>
					</div>
					<div className="relative z-0 mb-6 w-full group">
						<input
							type="text"
							name="ratings"
							id="ratings"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							htmlFor="ratings"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Ratings
						</label>
					</div>
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Add Recipe
				</button>
			</form>
		</div>
	);
};

export default AddRecipe;
