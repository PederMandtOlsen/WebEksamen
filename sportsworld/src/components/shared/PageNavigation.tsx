import { Link } from "react-router-dom";

const PageNavigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="athlete-search-edit-delete">Athletes</Link></li>
            </ul>
        </nav>
    )
}

export default PageNavigation;