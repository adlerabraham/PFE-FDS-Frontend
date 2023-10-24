import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../../features/auth/authSlice"

const RequireAuth = () => {

    //const curentToken = useSelector(selectCurrentToken)
    const curentToken = localStorage.getItem('accessToken')
    const location = useLocation()

    return (
        curentToken
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RequireAuth