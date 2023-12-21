import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
