import styled from "styled-components"
import { useState } from "react"
import Login from "../Components/auth/Login"
import SignUp from "../Components/auth/SignUp"

export default function Auth () {

    const [hasLogin, setHasLogin] = useState(true)
    function changeAuth(){
        setHasLogin(!hasLogin)
    }

    return(
        
        <Container hasLogin={hasLogin}>
            {hasLogin ? (<Login changeAuth={changeAuth}/>):(<SignUp changeAuth={changeAuth}/>)}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    padding-top: ${props => props.hasLogin ? '20vh':'5vh'};
`