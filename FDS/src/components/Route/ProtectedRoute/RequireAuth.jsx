import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../../features/authSlice"

const RequireAuth = () => {
    //const token = useSelector(selectCurrentToken)
    const token = localStorage.getItem('accessToken')
    const location = useLocation()

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RequireAuth