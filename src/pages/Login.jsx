import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError("Email and password required");
            return;
        }
        alert("Login UI validated successfully");
        console.log(form);
    };

    return (
        <AuthCard title="Login">
            <form onSubmit={handleSubmit}>
                {error && <div className="error-text">{error}</div>}

                <input
                    className="auth-input"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    className="auth-input"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button className="auth-btn">Login</button>
            </form>

            <div className="auth-link">
                New user? <Link to="/register">Register</Link>
            </div>
        </AuthCard>
    );
}

export default Login;
