import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../../../Hooks/useTitle";
const SignUp = () => {
	// terms and conditions state
	const [checkbox, setCheckbox] = useState(true);
	// show password state
	const [show, setShow] = useState(false);
	const [showPassword, setShowPassword] = useState("password");
	// user info state
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
	});
	// error state
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		fireError: "",
	});
	const {
		setLoading,
		continueWithGoogle,
		createUserWithEmailAndPass,
		userProfileUpdate,
	} = useContext(AuthContext);
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const navigate = useNavigate();

	// sign up with google
	const signUpWithGoogle = () => {
		continueWithGoogle()
			.then(result => {
				setLoading(true);
				const user = result.user;
				const currentUser = {
					email: user.email,
				};

				fetch(" https://food-masty-server.vercel.app/jwt", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(currentUser),
				})
					.then(res => res.json())
					.then(data => {
						localStorage.setItem("recipe-token", data.token);
						navigate(from, { replace: true });
						Swal.fire({
							position: "top-center",
							icon: "success",
							title: "your account has been created successfully",
							showConfirmButton: false,
							timer: 1500,
						});
						setLoading(false);
					});
			})
			.catch(error => {
				console.error(error);
				setLoading(false);
			});
		setLoading(true);
	};

	// create user
	const createUser = e => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const photoUrl = form.photoUrl.value;
		createUserWithEmailAndPass(userInfo.email, userInfo.password)
			.then(result => {
				userProfileUpdate(name, photoUrl);
				const user = result.user;
				const currentUser = {
					email: user.email,
				};
				fetch(" https://food-masty-server.vercel.app/jwt", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(currentUser),
				})
					.then(res => res.json())
					.then(data => {
						localStorage.setItem("recipe-token", data.token);
						navigate(from, { replace: true });
						Swal.fire({
							position: "top-center",
							icon: "success",
							title: "your account has been created successfully",
							showConfirmButton: false,
							timer: 1500,
						});
					});
			})
			.catch(error => {
				setLoading(false);
				setErrors({ ...errors, fireError: error.message });
			});
		setErrors({ ...errors, fireError: "" });
	};

	// handle email on change
	const handleEmailOnChange = e => {
		const email = e.target.value;
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			setErrors({ ...errors, email: "please provide a valid email" });
			setUserInfo({ ...userInfo, email: "" });
		} else {
			setErrors({ ...errors, email: "" });
			setUserInfo({ ...userInfo, email: email });
		}
	};
	// handle password on change
	const handlePasswordChange = e => {
		const password = e.target.value;
		if (password.length < 6) {
			setErrors({ ...errors, password: "password must be 6 characters " });
			setUserInfo({ ...userInfo, password: "" });
		} else {
			setErrors({ ...errors, password: "" });
			setUserInfo({ ...userInfo, password: password });
		}
	};
	useTitle("Sign Up");
	return (
		<div>
			<section>
				<div className="flex flex-col items-center justify-center px-6 py-8 animationContainer mx-auto   lg:py-0">
					<div
						className={`w-full   rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md customAnimation xl:p-0   border-gray-700`}>
						{errors.fireError && (
							<p className=" text-center text-red-400">{errors.fireError}</p>
						)}
						<div className="p-6 space-y-4 md:space-y-6 ">
							<h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign Up
							</h1>

							<form onSubmit={createUser} className="space-y-4 md:space-y-6">
								<div>
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Your name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder=" Your name"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="photourl"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Your photoURL
									</label>
									<input
										type="text"
										name="photoUrl"
										id="photourl"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder=" Your photoUrl"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Your email
									</label>
									<input
										onChange={handleEmailOnChange}
										type="email"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@example.com"
										required
									/>
									{errors.email && (
										<p className="flex items-center gap-1 text-red-400">
											<FaTimes className="mt-2" />
											{errors.email}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Password
									</label>
									<div className="flex  relative items-center">
										<input
											onChange={handlePasswordChange}
											type={showPassword}
											name="password"
											id="password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required
										/>

										<div
											onClick={() => setShow(!show)}
											className="absolute cursor-pointer right-2">
											{show ? (
												<FaEye
													onClick={() => setShowPassword("password")}
													className="text-gray-400  "
												/>
											) : (
												<FaEyeSlash
													onClick={() => setShowPassword("text")}
													className="text-gray-400  "
												/>
											)}
										</div>
									</div>
									{errors.password && (
										<p className="flex items-center gap-1 text-red-400">
											<FaTimes className="mt-2" />
											{errors.password}
										</p>
									)}
								</div>

								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											onClick={() => {
												setCheckbox(!checkbox);
											}}
											required
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="terms"
											className="font-light text-gray-500 dark:text-gray-300">
											I accept the{" "}
											<Link
												className="font-medium text-primary-600 hover:underline dark:text-primary-500"
												to="/terms">
												Terms and Conditions
											</Link>
										</label>
									</div>
								</div>
								<button
									disabled={checkbox}
									type="submit"
									className={
										checkbox
											? "w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400   dark:focus:ring-primary-800"
											: "w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 dark:focus:ring-primary-800"
									}>
									Sign Up
								</button>

								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<Link
										to="/signin"
										className="font-medium   hover:underline  ">
										Login here
									</Link>
								</p>
							</form>
							<div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5">
								<p className="text-center text-gray-300  font-bold mx-4 mb-0">
									Or
								</p>
							</div>
							<div>
								<button
									onClick={signUpWithGoogle}
									className=" w-full py-2 flex justify-center items-center gap-1 px-1 text-gray-500 border-gray-500 rounded-lg  hover:bg-gray-700 hover:text-white transition-all border">
									<FcGoogle className="text-xl lg:text-2xl" />{" "}
									<span>Sign up with Google</span>
								</button>{" "}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default SignUp;
