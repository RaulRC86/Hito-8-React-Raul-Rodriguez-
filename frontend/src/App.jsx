import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header, Navbar} from "./components"
import {Cart, Home, Login, Register, Pizza, Profile, NotFound} from "./pages"
import { CartProvider, UserProvider } from "./contexts";

function App() {
  return (
    <>
      <BrowserRouter>
      <UserProvider>
      <CartProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
        </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

