import styled from "styled-components"
// import logo from "../../img/background-auth.jpg"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import Button from "../../common/form/Button"
import Input from "../../common/form/Input"
import { Spinner } from "../../common/spinner/Spinner"
import UserContext from "../../context/UserContext"
import { useCustomForm } from "../../hooks/useCustomForms"
import api from "../../services/API"
import { ButtonWrapper } from "./ButtonWrapper"
import { InputWrapper } from "./InputWrapper"

export default function SignUp ({changeAuth}) {

    const [form, handleForm] = useCustomForm()
    const { setUserData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)

    function isValidEmail(email) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function SubmitForms(){
        setIsLoading(true)
        if (!form.email || !form.password){
            setIsLoading(false)
            return toast.error("Preencha todos os Campos")
        }

        const body = {
            email: form.email,
            name: form.name,
            password: form.password,
        }


        if(form.password !== form.passwordVerify){
            setIsLoading(false)
            return toast.error("As senhas não são iguais")
        }


            const verificaEmail = isValidEmail(form.email);
            if(verificaEmail === false){
                setIsLoading(false);
                return toast.error('Insira um email válido')
            }

        try {   


            const response = await api.CreateUser(body)
            if( response.status === 201){
                setUserData(response.data)
                toast.dark("Cadastro realizado com sucesso!")
                setIsLoading(false)
                changeAuth()
                return
            }

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error("Verifique os valores!")
            return
        }
    }

    return(
        <Container isLoading={isLoading}>

            {/* <img src={logo} alt="" onClick={() => setIsLoading(!isLoading)}/> */}

            <UserActionsContainer isLoading={isLoading}>
            <Column>
                <InputWrapper width={"100%"}>
                    <Input 
                        label="Email"     
                        type="email" 
                        name={"email"} 
                        value={form.email} 
                        onChange={handleForm}
                        width="80%"
                        disabled={isLoading}
                    />
                </InputWrapper>

                <InputWrapper width={"100%"}>
                    <Input 
                        label="Nome"     
                        type="text" 
                        name={"name"} 
                        value={form.name} 
                        onChange={handleForm}
                        width="80%"
                        disabled={isLoading}
                    />
                </InputWrapper>

                <InputWrapper width={"100%"}>
                    <Input 
                        label="Senha"     
                        type="password" 
                        name={"password"} 
                        value={form.password} 
                        onChange={handleForm}
                        width="80%"
                        disabled={isLoading}
                    />
                </InputWrapper>

                <InputWrapper width={"100%"}>
                    <Input 
                        label="Digite sua senha novamente"     
                        type="password" 
                        name={"passwordVerify"} 
                        value={form.passwordVerify} 
                        onChange={handleForm}
                        width="80%"
                        disabled={isLoading}
                    />
                </InputWrapper>

                </Column>
                <ButtonWrapper width={"100%"}>
                    <Button onClick={() => SubmitForms()} width={"80%"} height={"55px"}>{"Criar"}</Button>
                    <ChangeAuthButton onClick={changeAuth}>Ja tenho um Cadastro</ChangeAuthButton>
                </ButtonWrapper>

            </UserActionsContainer>

            {isLoading ? (<Spinner/>):(<></>)}
            
        </Container>
    )
}

const Container = styled.div`
    width: 490px;
    height: 580px;
    background-color: #FFFFFF;
    box-shadow: 0 8px 50px 0 #00000038;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
    row-gap: 5vh;
    position: relative;
    margin-bottom: 30px;
    img {
        max-height: 150px;
        max-width: 60%;
        opacity: ${props => props.isLoading ? ("0.2"):("1")};
    }
    @media (max-width: 850px) {
        width: 100%;
    }
`

const UserActionsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    row-gap: 3vh; 
    opacity: ${props => props.isLoading ? ("0.2"):("1")};
    pointer-events: ${props => props.isLoading ? ("none"):("initial")};
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const ChangeAuthButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1.5vh;
    user-select: none;
    cursor: pointer;
    text-decoration: underline;
    color: #707070;
`