import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import AddRecipe from "../Pages/AddRecipe/AddRecipe";
import Blog from "../Pages/Blog/Blog";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import SignIn from "../Pages/Login/SignIn/Signin";
import SignUp from "../Pages/Login/SignUp/Signup";
import Recipes from "../Pages/Recipes/Recipes";
import SingleRecipe from "../Pages/Recipes/SingleRecipe";
import MyReview from "../Pages/Review/MyReview";
import UpdateReview from "../Pages/Review/UpdateReview";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/home", element: <Home /> },
			{
				path: "/recipes",
				loader: async () =>
					fetch(" https://food-masty-server.vercel.app/recipes"),
				element: <Recipes />,
			},
			{ path: "/recipe/:id", element: <SingleRecipe /> },
			{
				path: "/addRecipe",
				element: (
					<PrivateRouter>
						{" "}
						<AddRecipe />{" "}
					</PrivateRouter>
				),
			},
			{ path: "/blog", element: <Blog /> },
			{ path: "/signup", element: <SignUp /> },
			{ path: "/signin", element: <SignIn /> },

			{
				path: "/review",
				element: (
					<PrivateRouter>
						<MyReview />
					</PrivateRouter>
				),
			},
			{
				path: "/updateReview/:id",
				loader: async ({ params }) =>
					fetch(` https://food-masty-server.vercel.app/reviewOne/${params.id}`),
				element: (
					<PrivateRouter>
						<UpdateReview />
					</PrivateRouter>
				),
			},
		],
	},
]);
export default router;
