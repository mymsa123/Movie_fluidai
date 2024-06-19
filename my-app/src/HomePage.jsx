import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Define styled-components
const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2.5em;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  margin-right: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 15px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 16px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    axios.get('https://freetestapi.com/api/v1/movies')
      .then(response => {
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching the movies:', error);
      });
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query)
    );
    if (filtered.length === 0) {
      alert('Movie not found');
    }
    setFilteredMovies(filtered);
  };

  return (
    <Container>
      <Title>Movie List</Title>
      <SearchBar>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <Button onClick={handleSearch}>Search</Button>
      </SearchBar>
      <Table>
        <thead>
          <tr>
            <TableHeader>S.No.</TableHeader>
            <TableHeader>Title</TableHeader>
            <TableHeader>Year</TableHeader>
            <TableHeader>Rating</TableHeader>
            <TableHeader>Genre</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie, index) => (
            <TableRow key={movie.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.year}</TableCell>
              <TableCell>{movie.rating}</TableCell>
              <TableCell>{movie.genre}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
