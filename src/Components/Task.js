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

function Task() {

  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleChecked = () => {
    setChecked(true)
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
            <h1>
                Ler um capítudo do livro  
            </h1>

            <h2>
                Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
            </h2>

            <h3>
                Criada em 15/08/2024
            </h3>

            <OptionsRow>

              <Edit />

              <Delete onClick={() => toggleExpanded()}/>

              <PopUpContainer 
                initial={{ width: 0 }}
                animate={{ width: expanded ? 'auto' : 0}}
                transition={{ duration: 0.5 }}
              >

                <h2>Deseja mesmo deletar essa tarefa? </h2>
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
  width: 70%;
  box-sizing: border-box;
  display: flex;
  font-family: sans-serif !important;
  display: flex;
  flex-direction: row;
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
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

const Left = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
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
color: #ccc;
width: 30px;
height: 30px;
margin-left: 10px;
transition: color 0.4s ease;
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
&:hover{
  cursor: pointer;
  color: #CA5151;
}
`;

const OptionsRow = styled.div`
display: flex;
align-items: center;
flex-direction: row;
margin-top: 15px;
max-height: 35px;
`;

const PopUpContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  margin-left: 12px;
  max-height: 28px;
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
    margin: 5px 0 0 0;
    transition: color 0.5s ease;
    color: #aaa;
    &:hover{
      color: #CE2B2B;
      cursor: pointer;
    }
  }
`;





