import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopMenu from './components/TopMenu/TopMenu'
import SideMenu from './components/SideMenu/SideMenu'
import Dashboard from './components/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound'

function App() {
    return (
        <Router>
            <TopMenu />
            <div style={{ display: 'flex' }}>
                <SideMenu />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/user/:id" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
