import { format, parseISO } from 'date-fns';
import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import backgroundHome from '../img/Background1.png'
import axios from 'axios';

function Admin() {
  const { userData } = useContext(UserContext);
  const BASE_URL = process.env.REACT_APP_BACK_END_URL || 'https://api-drjose-a332c114b508.herokuapp.com';

  const [paymentsArrState, setPaymentsArrState] = useState([]);
  const [initialPayments, setInitialPayments] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [closeBool, setCloseBool] = useState(false);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await axios.get(`${BASE_URL}/payment`, { headers: { Authorization: `Bearer ${userData.token}` } });
        console.log(response.data);
        setPaymentsArrState(response.data);
        setInitialPayments(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de pagamentos:', error);
      }
    }

    fetchPayments();
  }, [BASE_URL, userData.token]);

  function setPaymentsByStatus(status) {
    setCloseBool(!closeBool);
    console.log(status);
    if (status === 'all' || status === '') {
      setPaymentsArrState(initialPayments);
      return;
    }

    setPaymentsArrState(initialPayments.filter(p => String(p.paymentStatus) === status));
  }

  function setPaymentsByDate(date) {
    setCloseBool(!closeBool);

    if (!date) {
      setPaymentsArrState(initialPayments);
      return;
    }

    const dataFormatada = format(parseISO(date), 'dd/MM/yyyy');
    console.log(dataFormatada);
    console.log(initialPayments);
    const filtered = initialPayments.filter(p => formatDate(p.dataEmissao) === dataFormatada);

    setPaymentsArrState(filtered);
  }

  function inputVerification(value) {
    setCloseBool(!closeBool);

    if (value === '') {
      setPaymentsArrState(initialPayments);
      setInputValue(value);
      return;
    }

    const filteredArr = initialPayments.filter(p =>
      p.pagador.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase()),
    );
    setPaymentsArrState(filteredArr);
    setInputValue(value);
  }

  function formatDate(isoString) {
    return format(parseISO(isoString), 'dd/MM/yyyy');
  }

  return (
    <Container>
      <MainContentUs>
        <CenterContent>
          <Options>
            <h1>Pagamentos</h1>
            <Select onChange={(e) => setPaymentsByStatus(e.target.value)}>
              <option value=''>- Status -</option>
              <option value='all'>Todos</option>
              <option value='PAID'>Pagos</option>
              <option value='PENDING'>Pendentes</option>
            </Select>
            <Datepicker onChange={(e) => setPaymentsByDate(e.target.value)} type='date' />
            <Input
              placeholder='Busque por nome...'
              onChange={(e) => inputVerification(e.target.value)}
              value={inputValue}
            />
          </Options>
          <PaymentsWrapper>
            {paymentsArrState.map(payment => (
              <PaymentCard key={payment.id} status={payment.status}>
                <h2 style={{fontSize:'20px'}}>{payment.pagador.nome}</h2>
                <p>Status: {payment.paymentStatus === "PENDING" ? 'Pendente' : 'Pago'}</p>
                <p style={{fontSize:'15px'}}>Valor: R$ {payment.value}</p>
                <p style={{fontSize:'15px'}}>Data de Emissão: {payment.dataEmissao ? formatDate(payment.dataEmissao) : 'N/A'}</p>
                <p style={{fontSize:'15px'}}>Email: {payment.pagador.email}</p>
                <p style={{fontSize:'15px'}}>Telefone: {payment.pagador.phone}</p>
              </PaymentCard>
            ))}
          </PaymentsWrapper>
        </CenterContent>
      </MainContentUs>
    </Container>
  );
}

export default Admin;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${backgroundHome});
  background-size: cover;
  background-position: center;
  p {
    font-size: 3vh;
  }
  h1 {
    color: #4bc6b4;
  }
`;

const MainContentUs = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  padding: 5%;
  @media (max-width: 768px) {
    padding: 2%;
  }
`;

const CenterContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  backdrop-filter: blur(5px);
  flex-direction: column;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 2% 4%;
  @media (max-width: 768px) {
    padding: 2%;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;

  p {
    margin-right: 2vh;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    p, select, input {
      margin-bottom: 10px;
      margin-left: 0;
      width: 80%;
    }
  }
`;

const Select = styled.select`
  margin-left: 2vh;
  width: 10vh;
  height: 2.8vh;
  border-radius: 10px;
  padding: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Datepicker = styled.input`
  margin-left: 2vh;
  width: 13vh;
  height: 2.8vh;
  border-radius: 10px;
  padding: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Input = styled.input`
  margin-left: 2vh;
  width: 25vh;
  height: 2.8vh;
  border-radius: 10px;
  padding: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const PaymentsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentCard = styled.div`
  background-color: ${({ status }) => (status ? '#d4edda' : '#f8d7da')};
  border: 1px solid ${({ status }) => (status ? '#c3e6cb' : '#f5c6cb')};
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  p {
    margin: 5px 0;
  }
`;
