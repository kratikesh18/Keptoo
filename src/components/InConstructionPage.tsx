import React from "react";

function InConstructionPage() {
  return (
    <div className="flex flex-col text-center items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Under Construction</h1>
      <img
        src="https://media1.tenor.com/m/UDo8atxhOUMAAAAC/website-coming-soon-coming-soon.gif"
        alt="Under Construction"
        className="md:w-[30vw]"
      />
      <p className="text-lg text-gray-700">
        We are working hard to improve the site for you.
      </p>
    </div>
  );
}

export default InConstructionPage;
