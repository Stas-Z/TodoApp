import { Suspense, memo } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData } from '@/entities/User'
import { getRouteTodo } from '@/shared/const/router'

interface LoginPageProps {
    className?: string
}

const LoginPage = (props: LoginPageProps) => {
    const { className } = props

    const location = useLocation()

    const authData = useSelector(getUserAuthData)

    if (authData) {
        return (
            <Navigate to={getRouteTodo()} state={{ from: location }} replace />
        )
    }

    return (
        <Suspense fallback="">
            {/* <LoginModal className={className} /> */}
            LoginPage
        </Suspense>
    )
}
export default memo(LoginPage)
