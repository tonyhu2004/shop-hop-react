import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import InputField from "../../components/InputField.jsx";
import UserRepository from "../../repositories/UserRepository.js";


function Register() {
    const accountRepository = new UserRepository()
    const emptyAccount = {
        email: "",
        password: "",
        confirmPassword: ""
    }
    const [account, setAccount] = useState(emptyAccount);
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const handleChange = (name, value) => {
        setAccount((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }
    async function register(){
        const formAccount = {
            email: account.email,
            password: account.password,
        };
        return await accountRepository.Register(formAccount)
            .catch(error => {
                console.error("Error registering:", error);
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const emptyField = Object.values(account).some(
            (value) => value === ""
        );
        const samePassword = account.password === account.confirmPassword;
        if (emptyField){
            setErrorMessage("Register is not complete")
            setAccount(emptyAccount)
        }
        else if(!samePassword){
            setErrorMessage("Passwords are different")
            setAccount(emptyAccount)
        }
        else{
            register()
                .then((responseData) =>{
                    console.log(responseData)
                    if (responseData) {
                        setErrorMessage("");
                        navigate("/Account/Login");
                        toast.success("registered successfully!");
                    } else {
                        console.error("Offline error occurred");
                        setErrorMessage("Failed register");
                    }
                })
                .catch((error) => {
                    console.error("register failed:", error);
                    setErrorMessage("Failed to register");
                });
        }
    }
    return (
        <div className="FormContainer">
            <form onSubmit={handleSubmit}>
                <InputField label="Email" type="text" value={account.email}
                            onChange={(value) => handleChange('email', value)}/>
                <InputField label="Password" type="password" value={account.password}
                            onChange={(value) => handleChange('password', value)}/>
                <InputField label="Confirm Password" type="password" value={account.confirmPassword}
                            onChange={(value) => handleChange('confirmPassword', value)}/>
                <p style={{color: "red", marginTop: 0}}>{errorMessage}</p>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;