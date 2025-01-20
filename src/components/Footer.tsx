import {
  FaEnvelope,
  FaFilePdf,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div
      id="contact"
      className="w-full h-full bg-black relative p-20 flex flex-col gap-10 min-h-[50vh] justify-center items-center"
    >
      <div className="flex fjustify-center items-center gap-3">
        <a
          href="https://github.com/gitatractivo"
          target="_blank"
          className="text-white    mx-4"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/gitanshu-talwar-344108146/"
          target="_blank"
          className="text-white   mx-4"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="mailto:gitanshutalwar@gmail.com"
          target="_blank"
          className="text-white    mx-4"
        >
          <FaEnvelope size={24} />
        </a>
        <a
          href="https://twitter.com/gitatractivo"
          target="_blank"
          className="text-white   mx-4"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://docs.google.com/document/d/e/2PACX-1vTuz774YEcpDWbTeJJWDZZUZc5twjopb0lDTIUbvfhw0EsUIaieVP4HFoVjvQbxWkEBQ8g9j7F-rTuj/pub"
          target="_blank"
          className="text-white    mx-4"
          rel="noopener noreferrer"
        >
          <FaFilePdf size={24} />
        </a>
      </div>
      <p className="text-white   mx-4 absolute bottom-5">
        Made by Gitanshu Talwar
      </p>
    </div>
  );
};

export default Footer;
