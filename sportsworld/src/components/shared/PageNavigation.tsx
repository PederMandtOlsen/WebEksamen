import { Link } from "react-router-dom";

const PageNavigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/athlete-search-edit-delete">Athletes</Link></li>
                <li><Link to="/athlete-register">Register new athlete</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </nav>
    )
}

export default PageNavigation; 




