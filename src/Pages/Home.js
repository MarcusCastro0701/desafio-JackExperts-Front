import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from "../context/UserContext.js"
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Task from '../Components/Task.js';
import api from '../services/API.js';
import StyledButton from '../common/form/Button.js';
import { toast } from 'react-toastify';
import { Spinner } from '../common/spinner/Spinner.js';

function Home() {

  // Estados para gerenciar o estado expandido do formulário de entrada, status de carregamento e detalhes da tarefa
  const [expanded, setExpanded] = useState(false);
  const [editingVerify, setEditingVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para gerenciar entradas de tarefas e listas de tarefas
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [exibitionOption, setExibitionOption] = useState([]);

  // Estado para gerenciar a largura da janela e o contador do useEffect
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Estado para controlar a execução do UseEffect da tela principal, atualizando as tasks por usuário
  const [useEffectCounter, setUseEffectCounter] = useState(0);

  // Contexto para dados do usuário
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Função para atualizar o estado da largura da janela
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // Função para buscar tarefas da API
    async function getTasks(){
      try {
        setLoading(true);
        const getTasks = await api.getTasksByUserId(userData.token, userData.userId);
        setAllTasks(getTasks.data);
        setExibitionOption(getTasks.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error('Não foi possível obter as tarefas do usuário no momento.');
      }
    }

    // Buscar tarefas e remover o ouvinte de evento de redimensionamento ao desmontar o componente
    getTasks();
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [useEffectCounter]); // Dependência para re-executar o useEffect quando o contador mudar

  // Função para alternar o estado expandido do formulário de entrada
  const toggleExpanded = () => {
    setExpanded(!expanded);
    setTaskName('');
  };

  // Função para lidar com o logout do usuário
  async function handleLogout(){
    try {
      await api.LogoutSession(userData.token);
      setUserData({});
      window.location.reload();
    } catch (error) {
      setUserData({});
      console.log(error);
    }
  }

  // Função para inserir uma nova tarefa
  async function insertTask(){

    // Validações para o nome e descrição da tarefa
    if(taskName.length > 15){
      toast.error('Nome muito extenso! No máximo 15 caracteres');
      return;
    }

    if(taskDescription.length > 180){
      toast.error('Descrição muito extensa! No máximo 180 caracteres');
      return;
    }

    setExpanded(!expanded);
    setTaskName('');

    const body = {
      name: taskName,
      description: taskDescription,
    }

    try {
      setLoading(true);
      await api.insertTask(userData.token, body, userData.userId);
      setExpanded(!expanded);
      setTaskName('');
      setTaskDescription('');
      setLoading(false);
      setUseEffectCounter(useEffectCounter + 1);
      toast.dark('Tarefa inserida com sucesso!');
    } catch (error) {
      console.log(error);
      setExpanded(!expanded);
      setTaskName('');
      setTaskDescription('');
      setLoading(false);
      toast.error('Não foi possível inserir a tarefa no momento!');
    }
  }

  // Função para filtrar a exibição das tarefas
  function handleExibition(value){

    if(value === 'all'){
      setExibitionOption(allTasks);
      return;
    }
    if(value === 'pending'){
      const filtered = allTasks.filter(task => task.isDone === false);
      setExibitionOption(filtered);
      return;
    }
    if(value === 'complete'){
      const filtered = allTasks.filter(task => task.isDone === true);
      setExibitionOption(filtered);
      return;
    }
  }

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

        {!userData?.name && userData !== null ? (
          <>
            <h1>Para poder utilizar as funcionalidades do gerenciador de tarefas, faça login <Link to="/auth">
              <StyledButton
                background="#158A7A"
                backgroundhover="#2DA898"
              >
                Clicando aqui
              </StyledButton>
            </Link></h1> 
          </>
        ) : (
          <>
            <StyledButton backgroundhover={"#2DA898"} width={'190px'} onClick={toggleExpanded}>nova tarefa</StyledButton>
        
            <PopUpContainer
              initial={{ height: 0 }}
              animate={{ height: expanded ? 'auto' : 0}}
              transition={{ duration: 0.5 }}
            >
              <SimpleInput width={windowWidth > 800 ? '250px' : '100%'} placeholder='Nome... (no mínimo 4 caracteres)' value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
              <DescriptionInput width={windowWidth > 800 ? '100%' : '100%'} placeholder='Descrição... (no mínimo 10 caracteres)' value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>
              <span>
                <StyledButton 
                  fontSize={windowWidth > 800 ? '15px' : '10px'}  
                  backgroundhover={"#2DA898"} 
                  width={windowWidth > 800 ? '240px' : '220px'} 
                  onClick={insertTask}
                >
                  Adicionar tarefa
                </StyledButton>
                <StyledButton 
                  fontSize={windowWidth > 800 ? '15px' : '20px'} 
                  background={"#BD0505"} 
                  backgroundhover={"#E73232"}
                  width={windowWidth > 800 ? '130px' : '120px'} 
                  margintop={windowWidth > 800 ? '0px' : '10px'}
                  onClick={toggleExpanded}
                >
                  Cancelar
                </StyledButton>
              </span>
            </PopUpContainer>
    
            <TaskContainer>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <span>
                    Exibição
                    <select placeholder="exibição" onChange={(e) => handleExibition(e.target.value)}>
                      <option value={'all'}>Todas</option>
                      <option value={'complete'}>Completas</option>
                      <option value={'pending'}>Pendentes</option>
                    </select>
                  </span>
                  {exibitionOption.length === 0 ? (
                    <h1>Não há tarefas no momento!</h1>
                  ) : (
                    exibitionOption.map((task) => (
                      <Task 
                        editingVerify={editingVerify} 
                        setEditingVerify={setEditingVerify} 
                        taskInfo={task}
                        useEffectCounter={useEffectCounter}
                        setUseEffectCounter={setUseEffectCounter}
                      />
                    ))
                  )}
                </>
              )}
            </TaskContainer>
          </>
        )}
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
  @media (max-width: 800px) {
    margin-top: 0;
    height: auto;
    width: 100% !important;
    align-items: center;
    justify-content: center;
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
  h1{
    text-align: center;
  }
  @media (max-width: 800px) {
    align-items: center !important;
    justify-content: center !important;
    width: 100%;
    min-width: 100px !important;
  }
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
@media (max-width: 800px) {
    align-items: center !important;
    width: 100%;
    span{
      flex-direction: column;
    }
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
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const SimpleInput = styled.input`
  width: 275px;          
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
  @media (max-width: 800px) {
    width: 70%;
  }
`;

const TaskContainer = styled.div`
min-width: 100%;
padding: 15px 0px 15px 0;
display: flex;
flex-direction: column;
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
@media (max-width: 800px) {
    align-items: center !important;
    width: 100%;
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
@media (max-width: 800px) {
    width: 50%;
    justify-content: space-between;
  }
`;
