import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AthletePage from '../pages/AthletePage';
import PageNavigation from '../components/shared/PageNavigation';


const AppRouting = () => {
    return (
        <BrowserRouter>

        <PageNavigation></PageNavigation>

        <Routes>
            <Route path='/' element={<AthletePage/>}/>
            <Route path='/athlete-search-edit-delete' element={<AthletePage/>}/>
        </Routes>
        
        </BrowserRouter>
    )
} 

export default AppRouting;