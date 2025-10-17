import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand px-4 fs-2 fw-bold" to="/">
          HireHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto px-4">
            <Link className="nav-item nav-link fs-5 mx-2" to="/">
              Job Postings
            </Link>
            <Link className="nav-item nav-link fs-5 mx-2" to="/post-job">
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
