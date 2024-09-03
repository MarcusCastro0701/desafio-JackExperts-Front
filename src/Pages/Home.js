import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from "../context/UserContext.js"
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Fade, Zoom } from 'react-awesome-reveal';
import Task from '../Components/Task.js';
import api from '../services/API.js';
import StyledButton from '../common/form/Button.js';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';


function Home() {

  const [expanded, setExpanded] = useState(false);
  const [taskName, setTaskName] = useState('');
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setTaskName('')
  };

  async function handleLogout(){
    try {
      await api.LogoutSession(userData.token)
      setUserData({})
      window.location.reload()
    } catch (error) {
      setUserData({})
      console.log(error)
    }
  }

  useEffect(() => {

    return () => {
    };

  }, [userData, navigate]);

  return (
    <Container>
      {userData.token ? (
        <LogOutContainer>
          <span>Olá, { userData.name.split(" ")[0] }</span>
            <StyledButton 
              backgroundhover="#E73232"
              background="#BD0505"
              onClick={handleLogout}
            >
              Sair
            </StyledButton>

        </LogOutContainer> 
    ) : (
        ''
    )}
      <MainContentHome>

        {!userData?.name && userData !== null 
          ? 
          <>
            <h1>Para poder utilizar as funcionalidades do gerenciador de tarefas, faça login <Link to="/auth">
              <StyledButton
                background="#158A7A"
                backgroundhover="#2DA898"
                onClick={handleLogout}
              >
                Clicando aqui
              </StyledButton>
            </Link></h1> 
            
          </>
          
          : 
          <>
            <StyledButton backgroundhover={"#2DA898"} width={'190px'} onClick={toggleExpanded}>nova tarefa</StyledButton>
        
          <PopUpContainer
            initial={{ height: 0 }}
            animate={{ height: expanded ? 'auto' : 0}}
            transition={{ duration: 0.5 }}
          >
            
            <SimpleInput width={'250px'} placeholder='Nome da tarefa...' value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
    
            <DescriptionInput placeholder='Descrição...'/>
    
            <span>
              <StyledButton 
              fontSize={'15px'}  
              backgroundhover={"#2DA898"} 
              width={'240px'} 
              onClick={toggleExpanded}
              >
                Adicionar tarefa
              </StyledButton>
    
              <StyledButton 
              fontSize={'15px'} 
              background={"#BD0505"} 
              backgroundhover={"#E73232"}
              width={'130px'} 
              onClick={toggleExpanded}
              >
                Cancelar
              </StyledButton>
            </span>
    
          </PopUpContainer>
    
          <TaskContainer>
    
            <span>
    
              Exibição
              <select placeholder="exibição">
                <option>
                  Todas
                </option>
    
                <option>
                  Completas
                </option>
    
                <option>
                  Pendentes
                </option>
              </select>
    
            </span>
    
            <Task />
            <Task />
    
          </TaskContainer>
            </>
            }

        

      </MainContentHome>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  padding: 50px 0 0 0;
  display: flex;
  justify-content: center;
  font-family: sans-serif !important;
  background-color: #F2F2F2;
  @media (max-width: 1200px) {
    margin-top: 0;
    height: auto;
  }
`;

const MainContentHome = styled.div`
  width: auto;
  height: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  margin-top: 10vh;
  border: 0px solid #158A7A;
  min-width: 500px;
`;

const PopUpContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 85%;
  span{
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 390px !important;
  margin-top: 10px;
}
`;

const DescriptionInput = styled.textarea`
  width: 100%;          
  height: 120px;         
  padding: 16px;         
  font-size: 16px;       
  line-height: 1.5;      
  border: 2px solid #ccc; 
  border-radius: 8px;    
  resize: none;          
  box-sizing: border-box; 
  font-family: sans-serif;
  overflow: hidden;
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  &:focus {
    outline: none;        
    border-color: #158A7A; 
  }
`;

const SimpleInput = styled.input`
  width: 250px;          
  height: auto;         
  padding: 16px;         
  font-size: 16px;       
  line-height: 1.5;      
  border: 2px solid #ccc; 
  border-radius: 8px;    
  resize: none;          
  box-sizing: border-box; 
  font-family: sans-serif;
  margin: 25px 0 15px 0;
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  &:focus {
    outline: none;        
    border-color: #158A7A; 
  }
`;

const TaskContainer = styled.div`
width: 150%;
padding: 15px 15px 15px 0;
display: flex;
flex-direction: column;
justify-content: center;
span{
  display: flex;
  align-items: center;
  flex-direction: row;
  font-weight: 600;
  font-size: 22px;
  color: #757575;
  margin: 20px 0;
}
select{
 width: 150px;
 font-size: 18px;
 border-radius: 25px;
 font-weight: 500;
 margin-left: 13px;
 padding: 5px;
 color: #757575;
}
select:focus {
  outline: none;
  box-shadow: none;
}
`;

const LogOutContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:250px;
z-index:3;
right:15px;
top:25px;
position: absolute;
span{
  font-size: 16px;
  font-weight: 500;
  color:black;
  margin-right: 10px;
}
`;




