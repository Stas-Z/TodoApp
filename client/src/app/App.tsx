import { memo } from 'react'

import { ContentLayout } from '@/shared/layouts/ContentLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'

import AppRouter from './providers/router/ui/AppRouter'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props

    return (
        <div id="app" className={classNames('', {}, [className])}>
            <ContentLayout
                header={<Navbar />}
                sidebar="sidebar"
                content={<AppRouter />}
            />
        </div>
    )
})
