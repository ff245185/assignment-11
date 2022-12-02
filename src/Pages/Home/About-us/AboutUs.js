import person from "../../assets/images/about_us/person.jpg";
import AOS from "aos";
import { useEffect } from "react";
const AboutUs = () => {
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div data-aos="fade-up" className="mt-28 border-b pb-5 border-gray-500">
			<div className="lg:flex gap-10">
				<div className="lg:w-1/2">
					<img className="rounded-xl " src={person} alt="" />
				</div>
				<div className="lg:w-1/2 py-4">
					<h5 className="text-red-500 pb-4 font-bold">WHO WE ARE</h5>
					<h2 className="lg:text-5xl text-2xl font-semibold pb-7">
						Lots of flavors in one <br className="hidden lg:block " /> place.
					</h2>
					<p className="md:text-justify lg:pt-4 text-xl">
						Tortor scelerisque feugiat nibh ridiculus nisi si. Enim penatibus ac
						sed primis convallis fames taciti dolor tempor. Faucibus morbi
						posuere sagittis turpis class vivamus penatibus ornare mollis donec
						scelerisque.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
