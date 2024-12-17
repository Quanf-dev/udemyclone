import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouteProfile = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu token tồn tại trong localStorage
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login"); // Nếu không có token, điều hướng đến trang đăng nhập
    }
  }, [navigate]);

  // Nếu token tồn tại, render children (trang bạn muốn bảo vệ)
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Không hiển thị gì khi không có token
  return null;
};

export default ProtectedRouteProfile;
