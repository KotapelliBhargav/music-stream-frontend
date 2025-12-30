import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPwd, setShowPwd] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;

    const validate = (name, value) => {
        let error = "";

        if (name === "email") {
            if (!emailRegex.test(value)) {
                error = "Only Gmail or Yahoo allowed";
            }
        }

        if (name === "password") {
            if (!value) {
                error = "Password is required";
            }
        }

        return error;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleBlur = e => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const showError = field => touched[field] && errors[field];

    const isFormValid =
        Object.values(form).every(v => v) &&
        Object.values(errors).every(e => !e);

    const handleSubmit = e => {
        e.preventDefault();
        if (!isFormValid) return;

        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
            navigate("/dashboard"); // or home page
        }, 1200);
    };

    return (
        <>
            {showToast && (
                <div className="toast show">
                    ✅ Login successful! Redirecting...
                </div>
            )}

            <div className="auth-content">
                <div className="auth-card">
                    <h2>Login</h2>

                    <div className={`field ${showError("email") ? "error" : ""}`}>
                        <input
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {showError("email") && <span>{errors.email}</span>}
                    </div>

                    <div className={`field ${showError("password") ? "error" : ""}`}>
                        <input
                            type={showPwd ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <button type="button" onClick={() => setShowPwd(!showPwd)}>
                            👁
                        </button>
                        {showError("password") && <span>{errors.password}</span>}
                    </div>

                    <button
                        className="submit-btn"
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                    >
                        Login
                    </button>

                    <p className="switch">
                        Don’t have an account? <span>Register</span>
                    </p>
                </div>
            </div>
        </>
    );
}
