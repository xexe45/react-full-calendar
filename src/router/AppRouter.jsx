import { Navigate, Route, Routes } from "react-router-dom"
import { LoginScreen } from "../auth";
import { CalendarPage } from "../calendar";


export const AppRouter = () => {

    const authStatus = 'authenticated';

    return(
        <Routes>
            {
                (authStatus === 'not-authenticated') 
                ? <Route path="/auth/*" element={<LoginScreen />} />
                : <Route path="/*" element={<CalendarPage />} />
            }
           
            
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}