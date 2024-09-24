import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 border-t border-zinc-800 absolute w-full bottom-0">
      <p className="text-xs font-semibold text-zinc-400 text-center">
        Created by{" "}
        <a
          className="hover:text-[#512da8] cursor-pointer"
          href="https://www.linkedin.com/in/zakirali-dhuka-baab89259/"
          target="_blank"
        >
          @ZakirAli
        </a>
      </p>
    </footer>
  );
};

export default Footer;
