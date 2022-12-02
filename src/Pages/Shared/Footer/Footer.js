import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.png";
const Footer = () => {
	return (
		<div>
			<footer className="px-4 divide-y dark:bg-gray-800 dark:text-gray-100">
				<div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
					<div className="lg:w-1/3">
						<Link
							to="/"
							rel="noopener noreferrer"
							className="flex justify-center space-x-3 lg:justify-start">
							<div className="flex items-center justify-center w-12 h-12 rounded-full ">
								<img src={logo} alt="" />
							</div>
							<span className="self-center text-2xl font-semibold">
								FOOD&MASTY
							</span>
						</Link>
					</div>
					<div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
						<div className="space-y-3">
							<h3 className="tracking-wide uppercase dark:text-gray-50">
								Product
							</h3>
							<ul className="space-y-1">
								<li>
									<a rel="noopener noreferrer" href="#">
										Features
									</a>
								</li>
								<li>
									<a rel="noopener noreferrer" href="#">
										Integrations
									</a>
								</li>
								<li>
									<a rel="noopener noreferrer" href="#">
										Pricing
									</a>
								</li>
								<li>
									<a rel="noopener noreferrer" href="#">
										FAQ
									</a>
								</li>
							</ul>
						</div>
						<div className="space-y-3">
							<h3 className="tracking-wide uppercase dark:text-gray-50">
								Company
							</h3>
							<ul className="space-y-1">
								<li>
									<a rel="noopener noreferrer" href="#">
										Privacy
									</a>
								</li>
								<li>
									<a rel="noopener noreferrer" href="#">
										Terms of Service
									</a>
								</li>
							</ul>
						</div>
						<div className="space-y-3">
							<h3 className="uppercase dark:text-gray-50">Developers</h3>
							<ul className="space-y-1">
								<li>
									<a rel="noopener noreferrer" href="#">
										Public API
									</a>
								</li>
								<li>
									<a rel="noopener noreferrer" href="#">
										Documentation
									</a>
								</li>
								<li>
									<a rel="noopener noreferrer" href="#">
										Guides
									</a>
								</li>
							</ul>
						</div>
						<div className="space-y-3">
							<div className="uppercase dark:text-gray-50">Social media</div>
							<div className="flex justify-start space-x-3">
								<a
									rel="noopener noreferrer"
									href="#"
									title="Facebook"
									className="text-xl">
									<FaFacebook />
								</a>
								<a
									rel="noopener noreferrer"
									href="#"
									title="Twitter"
									className="text-xl">
									<FaTwitter />
								</a>
								<Link
									target={"_blank"}
									rel="noopener noreferrer"
									href="#"
									title="Instagram"
									className=" text-xl">
									<FaInstagram />
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="py-6 text-sm text-center dark:text-gray-400">
					© 2022 All rights reserved at{" "}
					<span
						title="if you want to know more info please visit here 👉🏿  https://web.programming-hero.com"
						className="text-red-500 font-bold italic">
						<a target={"_blank"} href="https://web.programming-hero.com">
							Programming-Hero{" "}
						</a>
					</span>{" "}
					Student.
				</div>
			</footer>
		</div>
	);
};

export default Footer;
