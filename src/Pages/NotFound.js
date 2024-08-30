import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container>
            <Content>
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <p>Redirecionando para a página inicial em 3 segundos...</p>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    padding-top: 15vh;
    justify-content: center;
    background-color: #f7f7f7;
`;

const Content = styled.div`
    text-align: center;
    h1 {
        color: #171717;
        font-size: 80px;
        font-weight: 700;
    }
    h2 {
        color: #171717;
        font-size: 30px;
        font-weight: 600;
        margin: 10px 0;
    }
    p {
        color: #171717;
        font-size: 18px;
    }
`;
