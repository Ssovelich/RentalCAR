import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header';
import HomePage from "../../pages/HomePage/HomePage"
import CatalogPage from '../../pages/CatalogPage/CatalogPage';
import CarDetailsPage from '../../pages/CarDetailsPage/CarDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

function App() {
 
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
