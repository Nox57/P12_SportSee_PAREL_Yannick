import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopMenu from './components/TopMenu/TopMenu'
import SideMenu from './components/SideMenu/SideMenu'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
    return (
        <Router>
            <TopMenu />
            <div style={{ display: 'flex' }}>
                <SideMenu />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
