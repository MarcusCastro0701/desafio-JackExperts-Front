import styled from 'styled-components';
import Home from '../Components/Home';

export default function LandingPage() {
    return (
        <Container>
            <Home/>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh !important;
    box-sizing: border-box;
`