import { memo } from 'react'

import { Counter } from '@/entities/Counter'
import { classNames } from '@/shared/lib/classNames/classNames'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props

    return (
        <div id="app" className={classNames('', {}, [className])}>
            <Counter />
        </div>
    )
})
