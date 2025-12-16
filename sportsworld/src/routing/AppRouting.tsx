import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AthletePage from '../pages/athlete/AthletePage';
import AthleteRegisterPage from '../pages/athlete/AthleteRegisterPage';
import PageNavigation from '../components/shared/PageNavigation';
import DashboardPage from '../pages/dashboard/DashboardPage';
import VenueManagerPage from '../pages/venue/VenueManagerPage';
import VenuePage from '../pages/venue/VenuePage';


const AppRouting = () => {
    return (
        <BrowserRouter>

        <PageNavigation></PageNavigation>

        <Routes>
            <Route path='/' element={<AthletePage/>}/>
            <Route path='/athlete-search-edit-delete' element={<AthletePage/>}/>
            <Route path='/athlete-register' element={<AthleteRegisterPage/>}/>
            <Route path='/dashboard' element={<DashboardPage/>}/>
            <Route path='/manage-venues' element={<VenueManagerPage/>}/>
            <Route path='/venues' element={<VenuePage/>}/>
        </Routes> 
        </BrowserRouter> 
    ) 
}

export default AppRouting;