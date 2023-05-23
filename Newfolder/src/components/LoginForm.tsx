import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LineChart from './LineChart'



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    '@media (min-width: 780px)': {
        width: '80%'
    },

    mainbox1: {
        width: "100%",
        minHeight: 700,
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(60deg,#ff3a7c,#741eff)",

    },
    box1: {
        minHeight: 555,
        height: "fit-content",
        width: "90%",
        border: "2px solid black",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        flexWrap: "wrap",
        justifyContent: "space-between"
    },

    postsEle: {
        '&:hover': {
            cursor: "pointer",
        },
    },
    childBox1: {
        width: 525,
        height: 555,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",

    },
    childBox2: {
        width: 525,
        height: 555,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,

    },
    childBox3: {
        height: "50%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    input1: {
        height: "10%",
        width: "67%",
        backgroundColor: "#d7d7d7;",
        borderRadius: 30,
        border: "2px solid black"
    },
    btn1: {
        height: "10%",
        width: "73%",
        backgroundColor: "#d7d7d7;",
        borderRadius: 30,
        border: "2px solid black",

        '&:hover': {
            cursor: "pointer",
        },

    }




}));






const LoginForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    interface initialState { latency: string, availability: string, price: string };
    const [formValue, setFormValue] = useState<initialState>({ latency: "", availability: "", price: "" });
    const [bandwidth, setBandwidth] = useState(null);

    const [formErrors, setFormErrors] = useState<initialState>({ latency: "", availability: "", price: "" });

    const handleChange = (event: any) => {

        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    };

    

    const validate = (values: initialState) => {
        let latError = "";
        let availError = "";
        let priceError = "";
        if (values.latency.length === 0) {
            latError = "Latency Field must not be Empty"
        }
        else if (!values.latency.match("[0-9]+")) {
            latError = "Latency must be a Float Number"
        }
        if (values.availability.length === 0) {
            availError = "Availibilty Field must not be Empty"
        }
        else if (!values.availability.match("[0-9]+")) {
            availError = "Availibilty must be a Float Number"
        }
        if (values.price.length === 0) {
            priceError = "Price Field must not be Empty"
        }
        else if (!values.price.match("[0-9]+")) {
            priceError = "Price must be a Float Number"
        }
        setFormErrors({ latency: latError, availability: availError, price: priceError });
        formErrors.latency = latError;
        formErrors.availability = availError;
        formErrors.price = priceError;


    }




    //store whether user is loggedin
    const handleLogin = async () => {
        validate(formValue);
        console.log(formErrors)
        if (formErrors?.latency === "" && formErrors.availability === "" && formErrors.price === "") {
            const {data}=await axios.post("http://127.0.0.1:5001/", formValue);
            console.log(data)
            setBandwidth(data.bandwidth);
        }


    }


    return (
        <>
            <div className={classes.mainbox1}>
                <div className={classes.box1}>
                    <div className={classes.childBox1}>
                       
                        <LineChart/>
                    </div>
                    <div className={classes.childBox2}>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors?.latency}</span><input className={classes.input1} type="text" name="latency" placeholder='Latency' onChange={handleChange} style={{ marginBottom: 10, fontSize: 20, paddingLeft: 20 }} />
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors?.availability}</span><input className={classes.input1} type="text" name="availability" placeholder='Availability' onChange={handleChange} style={{ marginBottom: 10, fontSize: 20, paddingLeft: 20 }} />
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors?.price}</span><input className={classes.input1} type="text" name="price" placeholder='Price' onChange={handleChange} style={{ marginBottom: 45, fontSize: 20, paddingLeft: 20 }} />
                        <button className={classes.btn1} style={{ backgroundColor: "#1aff1a", fontSize: 20, border: "5px solid black" }} onClick={handleLogin}>GET Bandwidth</button>
                        <div className={classes.childBox3}>
                            {
                                (bandwidth !== null) ? (
                                    <div>
                                        <h2>The Bandwidth is {bandwidth}</h2>
                                    </div>
                                ) : (
                                    <>
                                    </>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default LoginForm