import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Detail from '../pages/Detail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/festivals/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router