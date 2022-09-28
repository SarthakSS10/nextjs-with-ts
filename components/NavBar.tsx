import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="user">User</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/artist">Artists</Nav.Link>
            <Nav.Link href="/album">Albums</Nav.Link>
            <Nav.Link href="/user-rating">User Rating</Nav.Link>
            <Nav.Link href="/album-rating">Albums Rating</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;