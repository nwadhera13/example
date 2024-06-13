import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@mui/base';
// import ResponsiveAppBar from './components/navigation.tsx';


function fetchData() {
  return fetch('https://cat-fact.herokuapp.com/facts')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data; // Or you can process the data here before returning
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
      return null; // Return null or handle the error as needed
    });
}

const App = () => {
  const [apiData, setApiData] = useState(null);

  const handleButtonClick = () => {
    fetchData()
      .then(data => {
        setApiData(data);
      });
  };

  return (<>
        <ResponsiveAppBar/>
        <Button
            disabled={false}
            size="large"
            variant="elevated"
            onClick={()=>handleButtonClick()}
            >
                Add Keyword
                </Button>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {apiData ? (
          <div>
            {apiData.map((elem)=>(
              <h5>{elem.text}</h5>
            ))}
          </div>
        ) : (
          <div>No data fetched yet</div>
        )}
        </a>
      </header>
    </div>
          </>
  );
}

export default App;
