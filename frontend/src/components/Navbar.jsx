import { useLocation, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="h2 navbar-brand" to="/">
            <span className="h2 text-primary font-monospace font-bold">i</span>
            Chat
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="m-auto navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects">
                  Projects
                </Link>
              </li>
            </ul>

            {localStorage.getItem("user") ? (
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  onClick={onLogout}
                  className=" mt-3 btn btn-primary mb-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <ul className="nav-buttons d-flex nav-buttons">
                <li>
                  <Link to="/login">
                    <button type="button" className="btn btn-primary mx-2">
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <button type="button" className="btn btn-primary mx-2">
                      Register
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
