import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table, Spinner, Alert, Navbar } from 'react-bootstrap';
import { fetchData } from './store/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Navbar style={{ backgroundColor: '#f66' }} expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand style={{ color: 'white' }}>React test app</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <h1 className="mb-4"><span role="img" aria-labelledby="File">📋</span> File Data</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {data.flatMap((fileData) =>
              fileData.lines.map((line, index) => (
                <tr key={`${fileData.file}-${index}`}>
                  <td>{fileData.file}</td>
                  <td>{line.text}</td>
                  <td>{line.number}</td>
                  <td>{line.hex}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;