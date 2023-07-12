import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopMenu from './components/TopMenu/TopMenu'
import SideMenu from './components/SideMenu/SideMenu'
import Content from './components/Content/Content'

function App() {
    return (
        <Router>
            <TopMenu />
            <div style={{ display: 'flex' }}>
                <SideMenu />
                <Routes>
                    <Route path="/" element={<Content />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
