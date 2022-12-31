import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css';

function App() {
  const [robots, setRobots] = useState([]);
  const [filterRobots, setFilterRobots] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRobots(result)
          setFilterRobots(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
      )
  }, [])

  function handleFiltered(event) {
    setFilterRobots(robots.filter(robot => robot.name.toLowerCase().includes(event.target.value.toLowerCase())));
    console.log(robots.filter(robot => robot.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }
  
  while (error || !isLoaded) {
    return (error) ? <div>Error: {error.message}</div> : <div>Loading...</div>;
  }

  return (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox handleFiltered={handleFiltered} />
      <CardList robots={filterRobots} />
    </div>
  );
}

export default App;
