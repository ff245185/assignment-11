import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../../../Hooks/useTitle";
import "./Signin.css";
const SignIn = () => {
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
	const { continueWithGoogle, setLoading, logInWithEmailAndPassword } =
		useContext(AuthContext);
	useTitle("Sign in");
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const navigate = useNavigate();

	// sign in with email and password
	const signInWithEmailAndPassword = e => {
		e.preventDefault();

		logInWithEmailAndPassword(userInfo.email, userInfo.password)
			.then(result => {
				setLoading(true);
				const user = result.user;
				const currentUser = {
					email: user.email,
				};

				fetch(" https://food-masty-server.vercel.app/jwt", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(currentUser),
				})
					.then(res => res.json())
					.then(data => {
						localStorage.setItem("recipe-token", data.token);
						navigate(from, { replace: true });
						Swal.fire({
							position: "top-center",
							icon: "success",
							title: "Log in successfully",
							showConfirmButton: false,
							timer: 1500,
						});
						setLoading(false);
					});
			})
			.catch(error => {
				setErrors({ ...errors, fireError: error.message });
				setLoading(false);
			});
		setErrors({ ...errors, fireError: "" });
		setLoading(true);
	}; // Sign in with google
	const signInWithGoogle = async () => {
		continueWithGoogle()
			.then(result => {
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
							title: "Log in successfully",
							showConfirmButton: false,
							timer: 1500,
						});
					});
			})
			.catch(error => {
				console.error(error);
			});
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

	return (
		<div>
			<section>
				<div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto  animationContainer lg:py-0">
					<div
						className={`w-full customAnimation rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0   border-gray-700 `}>
						{errors.fireError && (
							<p className=" text-center text-red-400">{errors.fireError}</p>
						)}
						<div className="p-6 space-y-4 md:space-y-6 ">
							<h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign In
							</h1>

							<form
								className="space-y-4 md:space-y-6"
								onSubmit={signInWithEmailAndPassword}>
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
											className="absolute right-2">
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
								<div className="flex justify-between items-center mb-6">
									<div className="form-group form-check">
										<input
											type="checkbox"
											className="  h-4 w-4 border border-gray-300 rounded-sm bg-white  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
											id="exampleCheck2"
										/>
										<label
											className="form-check-label text-gray-500 inline-block  "
											htmlFor="exampleCheck2">
											Remember me
										</label>
									</div>
									<Link className="text-red-400">Forgot password?</Link>
								</div>

								<button
									type="submit"
									className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 dark:focus:ring-primary-800">
									Sign in
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don't have an account?{" "}
									<Link
										to="/signup"
										className="font-medium   hover:underline  ">
										Sign up
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
									onClick={signInWithGoogle}
									className=" w-full py-2 flex justify-center items-center gap-1 px-1 text-gray-500 border-gray-500 rounded-lg  hover:bg-gray-700 hover:text-white transition-all border">
									<FcGoogle className="text-xl lg:text-2xl" />{" "}
									<span>Sign in with Google</span>
								</button>{" "}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default SignIn;
