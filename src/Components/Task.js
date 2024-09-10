import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from "../context/UserContext.js"
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import api from '../services/API.js';
import { Spinner } from '../common/spinner/Spinner.js';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCheckSquare } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { format } from 'date-fns';

function Task({editingVerify, setEditingVerify, taskInfo, useEffectCounter, setUseEffectCounter}) {

  const [expanded, setExpanded] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const [taskDescription, setTaskDescription] = useState(taskInfo.description);
  const [taskName, setTaskName] = useState(taskInfo.name);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    if(!userData.name){
      toast('Você deve fazer o login antes!')
      navigate('/auth')
    }

    return () => {
    };

  }, []);

  function toggleExpanded() {
    setExpanded(!expanded)
  }

  function startEdition() {

    if(editingVerify){
      toast.dark('Apenas uma tarefa pode ser editada por vêz!');
      return
    }

    setEditingVerify(true);
    setEditing(true);
    return

  }

  function cancelEdition() {

    setTaskDescription(taskInfo.description);
    setTaskName(taskInfo.name);
    setEditingVerify(false);
    setEditing(false);
    return

  }

  async function deleteTask(){

    try {

      await api.deleteTaskById(taskInfo.id, userData.token);
      setExpanded(!expanded);
      toast.dark('Tarefa deletada com sucesso!');

      return setUseEffectCounter(useEffectCounter + 1);

    } catch (error) {
      console.log(error);
      setExpanded(!expanded);
      return toast.error('Não foi possível realizar esta ação no momento!')
    }

  }

  async function toggleChecked(){

    try {
      await api.setCheckedTrue(taskInfo.id, userData.token);
      setUseEffectCounter(useEffectCounter + 1);
      return toast.dark(`'${taskInfo.name}' marcada como finalizada!`)
    } catch (error) {
      console.log(error);
      return toast.error('Não foi possível realizar esta ação no momento!')
    }

  }

  async function newData(){

    if(taskName.length > 15){
      toast.error('Nome muito extenso! No máximo 15 caracteres')
      return
    }

    if(taskDescription.length > 180){
      toast.error('Descrição muito extensa! No máximo 180 caracteres')
      return
    }

    const body = {
      name: taskName,
      description: taskDescription
    }

    try {

      await api.setNewData(taskInfo.id, body, userData.token);
      cancelEdition();
      setUseEffectCounter(useEffectCounter + 1);
      return toast.dark('Informações atualizadas com sucesso!')

    } catch (error) {
      
      console.log(error);
      cancelEdition();
      toast.error('Não foi possível realizar esta ação no momento!')

    }

  }

  return (

    <Container>

        <Left>

            {editing 
            
              ? 

              <>
              
                <SimpleInput value={taskName} onChange={(e) => setTaskName(e.target.value)}/>

                <DescriptionInput value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>

                <OptionsRow>
                  <h3 onClick={() => newData()}>Pronto</h3>
                  <b onClick={() => cancelEdition()}>Cancelar</b>
                </OptionsRow>
              
              </>

              :

              <>
                  <h1>
                    {taskInfo.name}  
                  </h1>

                  <h2>
                    {taskInfo.description}
                  </h2>

                  <h3>
                    Criada em {format(new Date(taskInfo.createdAt), 'dd/MM/yyyy')}
                  </h3>

              </>

            }
            

            <OptionsRow editing={editing}>

              <span>

                  <Edit editing={editing} onClick={() => startEdition()}/>

                  <Delete onClick={() => toggleExpanded()} editing={editing}/>

              </span>

              <PopUpContainer 
                initial={{ height: 0 }}
                animate={{ height: expanded ? 'auto' : 0}}
                transition={{ duration: 0.5 }}
              >
        
                <h2>Deletar tarefa? </h2>
                <h3 onClick={() => deleteTask()} >Sim</h3>
                <b onClick={() => toggleExpanded()} >Não</b>

              </PopUpContainer>

            </OptionsRow>

        </Left>

        <Right>

            <Check onClick={() => toggleChecked()} isDone={taskInfo.isDone}/>

        </Right>
        
    </Container>
  );
}

export default Task;

const Container = styled.div`
  width: 100%;
  min-width: 700px;
  height: 270px;
  display: flex;
  flex-direction: row;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  color: #757575;
  background-color: #FFFFFF;
  margin-bottom: 20px;
  transition: border-color 0.5s ease;

  &:hover {
    border-color: #2DA898;
  }

  h1 {
    font-size: 23px;
    text-align: left !important;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 15px;
    max-width: 500px;
    font-weight: 520;
  }

  h3 {
    font-size: 15px;
    margin-top: 15px;
  }

  @media (max-width: 800px) {
    height: auto;
    min-height: 350px;
    flex-direction: column;
    width: 95%;
    justify-content: center;
    min-width: 100px;
    h2 {
      line-height: 1;
      margin: 30px 0 0 0;
    }
    h1, h2, h3{
      text-align: center !important;
    }

  }
`;

const DescriptionInput = styled.textarea`
  min-width: 450px;
  height: 60px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  resize: none;
  box-sizing: border-box;
  font-family: sans-serif;
  color: #757575;
  margin: 0 0 10px 0;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #158A7A;
  }

  @media (max-width: 800px) {
    min-width: 90%;
  }
`;

const SimpleInput = styled.input`
  width: 350px;
  padding: 5px;
  font-size: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-family: sans-serif;
  margin: 10px 0 15px 0;
  color: #757575;
  font-weight: 700;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #158A7A;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 72%;
  h2 {
    height: 60px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  h3 {
    margin-top: 15px;
  }

  @media (max-width: 800px) {
    width: 100%;
    height: auto;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 28%;
  @media (max-width: 800px) {
    width: 100%;
    height: auto;
  }
`;

const Check = styled(FaCheckSquare)`
  color: #ccc;
  width: 140px;
  height: 140px;
  color: ${(props) => (props.isDone ? `#8FC549` : `#ccc`)};
  transition: color 0.4s ease;

  &:hover {
    cursor: ${(props) => (props.isDone ? `default` : `pointer`)};
  }

  @media (max-width: 800px) {
    width: 120px;
    height: 120px;
  }
`;

const Edit = styled(FaRegEdit)`
  width: 30px;
  height: 30px;
  margin: 10px 0 0 10px;
  transition: color 0.4s ease;
  color: ${(props) => (props.editing ? `#2DA898` : `#ccc`)};

  &:hover {
    cursor: pointer;
    color: #2DA898;
  }

  @media (max-width: 800px) {
    margin: 0;
    width: 40px;
    height: 40px;
  }
`;

const Delete = styled(MdOutlineDelete)`
  color: #ccc;
  width: 35px;
  height: 35px;
  margin-left: 10px;
  transition: color 0.4s ease;
  margin-top: ${(props) => (props.editing ? `12px` : `10px`)};
  &:hover {
    cursor: pointer;
    color: #CA5151;
  }
  @media (max-width: 800px) {
    margin: 3px 0 0 0;
    width: 50px;
    height: 50px;
  }
`;

const OptionsRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 35px;
  margin-bottom: 4px;

  h2 {
    margin-right: 5px;
    font-size: 15px;
    margin-top: 8px;
  }

  h3 {
    font-size: 20px;
    margin: 5px 10px 0 5px;
    transition: color 0.5s ease;
    color: #aaa;

    &:hover {
      color: #79AF32;
      cursor: pointer;
    }
  }

  b {
    font-size: 20px;
    display: flex;
    margin: 5px 0 0 0;
    transition: color 0.5s ease;
    color: #aaa;

    &:hover {
      color: #CE2B2B;
      cursor: pointer;
    }
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    margin-top: ${(props) => (props.editing ? `36px` : `0`)} !important;
    height: 50px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    height: auto;
    margin-top: 0 !important;
    span{
      width: 30%;
      margin-top: ${(props) => (props.editing ? `10px` : `0`)};
    }
  }
`;

const PopUpContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: auto;
  margin: 5px 0 0 10px;
  h3 {
    margin-left: 10px;
    margin-top: 0 !important;
  }
  b{
    margin-top: 0 !important;
  }
  @media (max-width: 800px) {
    margin: 0;
    height: auto;
  }
`;






