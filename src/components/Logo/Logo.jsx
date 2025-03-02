import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src="/public/Logo.svg" alt="Logo" />
      </Link>
    </div>
  );
};

export default Logo;
