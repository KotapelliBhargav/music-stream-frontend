import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPwd, setShowPwd] = useState(false);
    const [showCpwd, setShowCpwd] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showToast, setShowToast] = useState(false);


    // Regex
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@_])[A-Za-z\d@_]{8,}$/;

    const validate = (name, value, currentForm = form) => {
        let error = "";

        switch (name) {
            case "username":
                if (!usernameRegex.test(value))
                    error = "Only letters, digits, _ (min 3 chars)";
                break;

            case "email":
                if (!emailRegex.test(value))
                    error = "Only Gmail or Yahoo allowed";
                break;

            case "password":
                if (!passwordRegex.test(value))
                    error = "Min 8 chars, 1 letter, 1 digit, @ or _";
                break;

            case "confirmPassword":
                if (value !== currentForm.password)
                    error = "Passwords do not match";
                break;

            default:
                break;
        }

        return error;
    };

    const handleChange = e => {
        const { name, value } = e.target;

        const updatedForm = { ...form, [name]: value };
        setForm(updatedForm);

        const error = validate(name, value, updatedForm);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleBlur = e => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const isFormValid =
        Object.values(form).every(v => v) &&
        Object.values(errors).every(e => !e);

    const handleSubmit = e => {
        e.preventDefault();
        if (!isFormValid) return;

        setSuccess(true);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
            navigate("/login");
        }, 1200);
    };

    const showError = field => touched[field] && errors[field];



    return (
        <>
            {showToast && (
                <div className="toast show">
                    ✅ Registration successful! Redirecting to login...
                </div>
            )}
            <div className="auth-content">
                <div className={`auth-card ${success ? "success" : ""}`}>
                    <h2>Register</h2>

                    {["username", "email"].map(field => (
                        <div
                            key={field}
                            className={`field ${showError(field) ? "error" : ""}`}
                        >
                            <input
                                name={field}
                                value={form[field]}
                                placeholder={field === "username" ? "User Name" : "Email"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {showError(field) && <span>{errors[field]}</span>}
                        </div>
                    ))}

                    <div className={`field ${showError("password") ? "error" : ""}`}>
                        <input
                            type={showPwd ? "text" : "password"}
                            name="password"
                            value={form.password}
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <button type="button" onClick={() => setShowPwd(!showPwd)}>👁</button>
                        {showError("password") && <span>{errors.password}</span>}
                    </div>

                    <div className={`field ${showError("confirmPassword") ? "error" : ""}`}>
                        <input
                            type={showCpwd ? "text" : "password"}
                            name="confirmPassword"
                            value={form.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <button type="button" onClick={() => setShowCpwd(!showCpwd)}>👁</button>
                        {showError("confirmPassword") && <span>{errors.confirmPassword}</span>}
                    </div>

                    <button
                        className="submit-btn"
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                    >
                        {success ? "Registered ✔" : "Register Now"}
                    </button>

                    <p className="switch">
                        Already have an account? <span>Login</span>
                    </p>
                </div>
            </div>
        </>
    );

}
