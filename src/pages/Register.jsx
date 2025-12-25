import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.username.trim()) errs.username = "Username required";
        if (!form.email.includes("@")) errs.email = "Valid email required";
        if (form.password.length < 6) errs.password = "Min 6 characters";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);

        if (Object.keys(errs).length === 0) {
            alert("Register UI validated successfully");
            console.log(form);
        }
    };

    return (
        <AuthCard title="Create Account">
            <form onSubmit={handleSubmit}>
                <input
                    className="auth-input"
                    placeholder="Username"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                {errors.username && <div className="error-text">{errors.username}</div>}

                <input
                    className="auth-input"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}

                <input
                    type="password"
                    className="auth-input"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                {errors.password && <div className="error-text">{errors.password}</div>}

                <button className="auth-btn">Register</button>
            </form>

            <div className="auth-link">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </AuthCard>
    );
}

export default Register;
