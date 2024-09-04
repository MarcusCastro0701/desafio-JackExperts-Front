import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from "../context/UserContext.js"
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import api from '../services/API.js';
import StyledButton from '../common/form/Button.js';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCheckSquare } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

function Task({editingVerify, setEditingVerify}) {

  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const [description, setDescription] = useState('Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.');
  const [title, setTitle] = useState('Ler Capítulo do Livro');
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleChecked = () => {
    setChecked(true)
  }

  const startEdition = () => {

    if(editingVerify){
      toast.dark('Apenas uma tarefa pode ser editada por vêz!');
      return
    }

    setEditingVerify(true)
    setEditing(true)

  }

  const cancelEdition = () => {

    setEditingVerify(false);
    setEditing(false);

  }

  useEffect(() => {

    if(!userData.name){
      toast('Você deve fazer o login antes!')
      navigate('/auth')
    }

    return () => {
    };

  }, []);

  return (
    <Container>

        <Left>

            {editing 
            
              ? 

              <>
              
                <SimpleInput value={title} onChange={(e) => setTitle(e.target.value)}/>

                <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)}/>

                <OptionsRow>
                  <h3>Pronto</h3>
                  <b onClick={() => cancelEdition()}>Cancelar</b>
                </OptionsRow>
              
              </>

              :

              <>
                  <h1>
                    {title}  
                  </h1>

                  <h2>
                    {description}
                  </h2>

                  <h3>
                    Criada em 15/08/2024
                  </h3>

              </>

            }
            

            <OptionsRow>

              <Edit editing={editing} onClick={() => startEdition()}/>

              <Delete onClick={() => toggleExpanded()}/>

              <PopUpContainer 
                initial={{ width: 0 }}
                animate={{ width: expanded ? 'auto' : 0}}
                transition={{ duration: 0.2 }}
              >
        
                <h2>Deletar tarefa? </h2>
                <h3 onClick={() => toggleExpanded()} >Sim</h3>
                <b onClick={() => toggleExpanded()} >Não</b>

              </PopUpContainer>

            </OptionsRow>

        </Left>

        <Right>

            <Check onClick={() => toggleChecked()} checked={checked}/>

        </Right>
        
    </Container>
  );
}

export default Task;

const Container = styled.div`
  min-width: 100% !important;
  max-width: 100% !important;
  height: 250px;
  box-sizing: border-box;
  display: flex;
  font-family: sans-serif !important;
  display: flex;
  flex-direction: row;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  color: #757575;
  background-color: #FFFFFF;
  margin-bottom: 20px;
  transition: border-color 0.5s ease;
  &:hover{
  border-color: #2DA898 ;
}
  h1{
    margin-bottom: 0 !important;
    font-size: 23px;
  }
  h2{
    font-size: 18px;
    margin-bottom: 0 !important;
    max-width: 500px !important;
    font-weight: 520 !important;
  }
  h3{
    font-size: 15px;
  }
  @media (max-width: 1200px) {
    margin-top: 0;
    height: auto;
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
  overflow: hidden;
  color: #757575;
  margin: 0 0 10px 0;
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  &:focus {
    outline: none;        
    border-color: #158A7A; 
  }
`;

const SimpleInput = styled.input`
  width: 350px;          
  height: auto;         
  padding: 5px;         
  font-size: 20px;          
  border: 2px solid #ccc; 
  border-radius: 8px;    
  resize: none;          
  box-sizing: border-box; 
  font-family: sans-serif;
  margin: 10px 0 15px 0;
  color: #757575;
  font-weight: 700 !important;
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  &:focus {
    outline: none;        
    border-color: #158A7A; 
  }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 72%; 
    max-width: 72%;
    h2{
      height: 60px !important;
      display: flex;
      align-items: center;
  
    }
`;

const Right = styled.div`
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 28%;
`;

const Check = styled(FaCheckSquare)`
color: #ccc;
width: 140px;
height: 140px;
color: ${(props) => props.checked ? `#8FC549` : `#ccc`};
transition: color 0.4s ease;
&:hover{
  cursor: ${(props) => props.checked ? `default` : `pointer`};
}
`;

const Edit = styled(FaRegEdit)`
width: 30px;
height: 30px;
margin: 10px 0 0 10px;
transition: color 0.4s ease;
color: ${(props) => props.editing ? `#2DA898` : `#ccc`};
&:hover{
  cursor: pointer;
  color: #2DA898;
}
`;

const Delete = styled(MdOutlineDelete)`
color: #ccc;
width: 35px;
height: 35px;
margin-left: 10px;
transition: color 0.4s ease;
margin: 10px 0 0 10px;
&:hover{
  cursor: pointer;
  color: #CA5151;
}
`;

const OptionsRow = styled.div`
display: flex;
align-items: center;
flex-direction: row;
max-height: 35px;
position: bottom;
margin-bottom: 4px;
h2{
    margin-right: 5px;
    font-size: 15px;
    margin-top: 8px !important;
  }
  h3{
    font-size: 20px;
    margin: 5px 10px 0 5px; 
    transition: color 0.5s ease;
    color: #aaa;
    &:hover{
      color: #79AF32;
      cursor: pointer;
    }
  }
  b{
    font-size: 20px;
    display: flex;
    margin: 5px 0 0 0 !important;
    transition: color 0.5s ease;
    color: #aaa;
    &:hover{
      color: #CE2B2B;
      cursor: pointer;
    }
  }
`;

const PopUpContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  margin: 5px 0 0 10px;
  max-height: 28px;
  h2{
    margin: 0 !important;
    height: auto !important;
  }
  h3{
    margin-left: 10px !important;
  }
`;






