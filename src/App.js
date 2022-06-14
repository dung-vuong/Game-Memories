import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import NavBar from "./components/NavBar/navbar.js";
import Home from "./components/Home/home.js";
import Auth from "./components/Auth/auth.js"

const App = () => {
    return(
        <BrowserRouter>
            <Container maxWidth='lg'>
                <NavBar/>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/auth" exact element={<Auth/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;