import React from "react";
import LogoSquare from "../../assets/images/logoSquare.jpg";
const About = () => {
  return (
    <div>
      <h1 className="text-center uppercase text-35 font-bold mt-10">
        About Us{" "}
      </h1>
      <div className="flex items-stretch justify-center px-10 mt-12">
        <div className="w-70% ml-40 mr-5">
          <p className="text-20 font-extralight pt-5">
            Everything we do is rooted in sport. Sport plays an increasingly
            important role in more and more people’s lives, on and off the field
            of play. It is central to every culture and society and is core to
            our health and happiness. Key to our success are our people and our
            culture. They bring our identity to life, defined by our purpose,
            mission, and attitude.
          </p>
          <p className="text-20 font-extralight pt-5">
            Our purpose, ‘through sport, we have the power to change lives’,
            guides the way we run our company, how we work with our partners,
            how we create our products, and how we engage with our consumers. We
            will always strive to expand the limits of human possibilities, to
            include and unite people in sport, and to create a more sustainable
            world. To experience how our employees and partners are driving
            change through purpose – and how you can find purpose, too
          </p>
        </div>
        <div className="w-30% pr-14">
          <img src={LogoSquare} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default About;
