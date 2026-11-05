import { Clapperboard } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigateTo = useNavigate()
    const { pathname } = useLocation()

    return (
        <nav
            className="site-nav"
            aria-label="Main navigation"
        >
            <Link className="brand" to="/" aria-label="WatchWise home">
                <Clapperboard size={20} className="brand-mark" />
                <span className="brand-name">Watch<span>Wise</span></span>
            </Link>
            <div className="nav-right">
                {pathname !== "/preferences" && (
                    <button className="nav-cta" onClick={() => navigateTo("/preferences")}>
                        <span>Find a movie</span>
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
