import React from "react";
const Header = () => {
  return (
    <>
      <section className="p-4 text-lg uppercase absolute z-10 text-white font-mono scale-hover">
        {import.meta.env.VITE_APP_NAME}
      </section>
    </>
  );
};

export default Header;
