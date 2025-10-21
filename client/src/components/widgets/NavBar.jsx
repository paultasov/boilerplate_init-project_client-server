import { Link } from 'react-router';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NavBar({ user, setUser }) {
  const signoutHandle = async () => {
    try {
      await axios.delete('/api/auth/signout');
      setUser(null);
    } catch (err) {
      console.log('Error (client, NavBar (signout btn)) // Axios: signout', { message: err.message });
    }
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Logo
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/cards">
            Cards
          </Nav.Link>
        </Nav>

        <div style={{ display: 'flex' }}>
          {!user ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/signin">
                  SignIn
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/signup">
                  SignUp
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="secondary" onClick={signoutHandle}>
                Exit
              </Button>
              <div style={{ color: '#fff', marginLeft: '10px' }}>{`Hi, ${user.name}`}</div>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
