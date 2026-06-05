import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddMobile from './components/AddMobile';
import EditMobile from './components/EditMobile';
import Home from './components/Home';
import ViewMobile from './components/ViewMobile';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Simple Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              📱 Mobile Store
            </Link>
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/add">
                Add Mobile
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddMobile />} />
            <Route path="/edit/:id" element={<EditMobile />} />
            <Route path="/view/:id" element={<ViewMobile />} />
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className="bg-dark text-light py-3 mt-5">
          <div className="container text-center">
            <p className="mb-0">Mobile Store App © 2024</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;