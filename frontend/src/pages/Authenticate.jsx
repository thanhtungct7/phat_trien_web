import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../services/localStorageService";
import "../styles/Authenticate.css"; // You'll need to create this CSS file
import {jwtDecode} from "jwt-decode";

export default function Authenticate() {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        console.log(window.location.href);

        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);

        if (isMatch) {
            const authCode = isMatch[1];

            fetch(
                `http://localhost:8080/api/auth/outbound/authentication?code=${authCode}`,
                {
                    method: "POST",
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);

                    setToken(data.result?.token);

                    // Decode token để lấy thông tin scope/roles
                    let userInfo = {};
                    if (data.result?.token) {
                        const payload = jwtDecode(data.result.token);
                        // Lấy scope từ token
                        const scope = payload.scope;
                        // Nếu scope là "ADMIN USER" thì tách thành mảng
                        const roles = typeof scope === "string" ? scope.split(" ") : (scope || []);
                        // Có thể lấy thêm name/email/username trong payload (tùy backend)
                        userInfo = {
                            username: payload.username || payload.sub || "", // sub là thường dùng trong JWT
                            name: payload.name || payload.username || payload.sub || "",
                            authenticated: true,
                            roles,
                            // Nếu backend cho thêm trường khác trong token
                            ...payload,
                        };
                        // Lưu vào localStorage
                        localStorage.setItem("userInfo", JSON.stringify(userInfo));
                        console.log("Saved userInfo:", userInfo);
                    }

                    setIsLoggedin(true);
                });

        }
    }, []);

    useEffect(() => {
        if (isLoggedin) {
            navigate("/");
            window.location.reload(); 
        }
    }, [isLoggedin, navigate]);

    return (
        <div className="auth-container">
            <div className="spinner"></div>
            <p className="auth-text">Authenticating...</p>
        </div>
    );
}