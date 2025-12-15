import { Link } from "react-router-dom";

const PageNavigation = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-12 mb-8 bg-gray-200" >
            
                <h1 className="text-xl font-semibold px-4"><Link to={"/"}>Sportsworld</Link></h1>
            
            <ul className="flex gap-6">
                <li><Link to="/athlete-search-edit-delete" className="hover:text-gray-500">Athletes</Link></li>
                <li><Link to="/athlete-register" className="hover:text-gray-500">Register new athlete</Link></li>
                <li><Link to="/dashboard" className="hover:text-gray-500">Dashboard</Link></li>
            </ul>
        </nav>
    )
}

export default PageNavigation; 




