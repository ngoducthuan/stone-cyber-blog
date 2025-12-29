import { Navigate, useLocation } from "react-router-dom";

export default function NotFoundRedirect() {
  const { pathname } = useLocation();

  // Nếu là file static (ảnh, css, js...) thì KHÔNG redirect
  if (/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|map)$/i.test(pathname)) {
    return null;
  }

  // Các path khác → redirect về /categories
  return <Navigate to="/categories" replace />;
}
