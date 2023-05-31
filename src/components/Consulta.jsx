import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #0077b6;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  &:focus {
    outline: none; 
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function Consulta() {
  const URL = 'http://localhost:8000/consulta/';
  const [inputCep, setInputCep] = useState('');
  const [dados, setDados] = useState(null);
  const [errorRequest, setErrorRequest] = useState(null);

  const pesquisaCEP = () => {
    axios
      .get(URL, {
        params: {
          cep: inputCep,
        },
      })
      .then(function (response) {
        setDados(response.data);
        setErrorRequest(null);
      })
      .catch(function () {
        setErrorRequest('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.');
        setDados(null); 
      });
  };

  return (
    <Box>
      <Title>Consultar CEP</Title>
      <InputBox>
        <Input type="number" value={inputCep} onChange={(e) => setInputCep(e.target.value)} />
        <Button type="submit" onClick={pesquisaCEP}>
          Pesquisar
        </Button>
      </InputBox>
      {dados && (
        <div>
          <p>Cep: {dados.cep}</p>
          <p>Estado: {dados.state}</p>
          <p>Cidade: {dados.city}</p>
          <p>Bairro: {dados.neighborhood}</p>
          <p>Rua: {dados.street}</p>
        </div>
      )}

      {errorRequest && <p>{errorRequest}</p>}
    </Box>
  );
}

export default Consulta;