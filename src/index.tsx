import { createRoot } from 'react-dom/client'

import { App } from './app/App'
import '@/app/styles/index.scss'
import { ErrorBoundary } from './app/providers/ErrorBoundary'
import { StoreProvider } from './app/providers/StoreProvider'

const container = document.getElementById('root')
if (!container) {
    throw new Error("Container root not found. Can't mount react app")
}
const root = createRoot(container)

root.render(
    <StoreProvider>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </StoreProvider>,
)
