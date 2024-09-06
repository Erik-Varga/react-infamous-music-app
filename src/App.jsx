import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer'
import Home from './pages/Home';

function App() {
  return (
    <>
      <div className='App h-screen sm:h-auto w-full flex flex-col items-center justify-between text-slate-950 dark:text-gray-200 bg-[#f5f5f5] dark:bg-black'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </BrowserRouter>
        <Footer />
      </div>
    </>
  )
}

export default App
