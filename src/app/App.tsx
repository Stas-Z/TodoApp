import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import AppRouter from './providers/router/ui/AppRouter'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props

    return (
        <div id="app" className={classNames('', {}, [className])}>
            <AppRouter />
        </div>
    )
})
