import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BillsPage from "./pages/BillsPage";
import TypePage from "./pages/TypePage";
import QRCodePage from "./pages/QRCodePage";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import OrderCartPage from "./pages/OrderCartPage";
import KitchenPage from "./pages/KitchenPage";
import ImageUrlPage from "./pages/ImageUrlPage"; // นำเข้า ImageUrlPage

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <ItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <BillsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/types"
          element={
            <ProtectedRoute>
              <TypePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qrcode"
          element={
            <ProtectedRoute>
              <QRCodePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/image-urls"
          element={
            <ProtectedRoute>
              <ImageUrlPage />
            </ProtectedRoute>
          }
        />

        <Route path="/order/:tableId" element={<OrderPage />} />
        <Route path="/orders/:tableId/cart" element={<OrderCartPage />} />
        <Route path="/orders/cart/:tableId" element={<OrderCartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kitchen" element={<KitchenPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
