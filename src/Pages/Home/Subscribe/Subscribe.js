import React, { useEffect } from "react";
import AOS from "aos";
const Subscribe = () => {
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div className="mb-12 mt-32">
			<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
				<div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl">
					<div data-aos="zoom-in-right" className="text-center">
						<div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
							<div>
								<p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-200 uppercase rounded-full bg-teal-accent-400">
									Brand new
								</p>
							</div>
							<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-300 sm:text-4xl md:mx-auto">
								<span className="relative inline-block">
									<svg
										viewBox="0 0 52 24"
										fill="currentColor"
										className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
										<defs>
											<pattern
												id="b039bae0-fdd5-4311-b198-8557b064fce0"
												x="0"
												y="0"
												width=".135"
												height=".30">
												<circle cx="1" cy="1" r=".7" />
											</pattern>
										</defs>
										<rect
											fill="url(#b039bae0-fdd5-4311-b198-8557b064fce0)"
											width="52"
											height="24"
										/>
									</svg>
									<span className="relative"> Subscribe</span>
								</span>{" "}
								to Newsletter to get our new food recipes.
							</h2>
						</div>
						<form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
							<input
								placeholder="Email"
								required
								type="text"
								className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300  md:rounded-l-lg  shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
							/>
							<button
								type="submit"
								className=" bg-red-500   hover:text-white transition-all px-5 p-3  md:rounded-r-lg  ">
								Subscribe
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Subscribe;
