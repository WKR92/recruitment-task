import './styles/main.css';
import {useState, useEffect, useCallback} from 'react';

function App() {

  const [planets, setPlanets] = useState([]);
  const [APIError, setAPIError] = useState('');
  const [activePaginationBtn, setActivePaginationBtn] = useState('pagination__btns--1');

  // if API error
  const handleAPIError = () => {
    setAPIError('API not responding. Refresh page and try again.')
    const loaderAPIConnected = document.getElementById('loader');
    loaderAPIConnected.classList.remove('loader--api-connected');
  }

  const initialSort = (data) => {
    const allRadioBtns = document.querySelectorAll('input');
    const selectedRadio = Object.values(allRadioBtns).filter(e => e.checked === true);
    const sortedPlanets = [...data]

    if(selectedRadio[0].value === 'name') {setPlanets(sortedPlanets.sort((a, b) => a.name.localeCompare(b.name)))}
    if(selectedRadio[0].value === 'rotation') {setPlanets(sortedPlanets.sort((a, b) => a.rotation_period.localeCompare(b.rotation_period)))}
    if(selectedRadio[0].value === 'climate') {setPlanets(sortedPlanets.sort((a, b) => a.climate.localeCompare(b.climate)))}
    if(selectedRadio[0].value === 'gravity') {setPlanets(sortedPlanets.sort((a, b) => a.gravity.localeCompare(b.gravity)))}
  }

   // fetch function
   const fetchApi = useCallback((page) => {
    setPlanets([]);
    fetch('https://swapi.dev/api/planets/'
    + '?page='
    + page)
    .then(response => response.json())
    .then(data => initialSort(data.results))
    .catch(err => handleAPIError())
  }, [])

  // sorting
  const sortPlanets = (event) => {
    if(planets.length > 0){
      const sortBy = event.target.value
      const sortedPlanets = [...planets]
  
      if(sortBy === 'name') {setPlanets(sortedPlanets.sort((a, b) => a.name.localeCompare(b.name)))}
      if(sortBy === 'rotation') {setPlanets(sortedPlanets.sort((a, b) => a.rotation_period.localeCompare(b.rotation_period)))}
      if(sortBy === 'climate') {setPlanets(sortedPlanets.sort((a, b) => a.climate.localeCompare(b.climate)))}
      if(sortBy === 'gravity') {setPlanets(sortedPlanets.sort((a, b) => a.gravity.localeCompare(b.gravity)))}
    }
  }

  // initial fetch
  useEffect(() => {
    fetchApi(1);
  }, [fetchApi])

  // pagination btns
  const setActualPage = (e) => {
    e.preventDefault();
    setActivePaginationBtn(e.target.id)
  }

  return (
    <div className="App">
    <div className="main">
      <h1>StarWars Planets</h1>

      <div className='sortingArea'>
        <h3>Sort by:</h3>
        <form className="sortingArea__form" onChange={sortPlanets}>
          <label><input type="radio" value="name" name='filter' className="radioName" defaultChecked/>Name</label>
          <label><input type="radio" value="rotation" name='filter' className="radioRotation"/>Rotation period</label>
          <label><input type="radio" value="climate" name='filter' className="radioClimate"/>Climate</label>
          <label><input type="radio" value="gravity" name='filter' className="radioGravity"/>Gravity</label>
        </form>
      </div>

      <div className="table">
        <p className="table__tag">Name</p>
        <p className="table__tag">Rotation period</p>
        <p className="table__tag">Climate</p>
        <p className="table__tag">Gravity</p>
        <p className="table__tag">Created at</p>
        <p className="table__tag">Path</p>
      </div>

      {planets?.length > 0
      ? planets.map(e =>
      <div key={e.name} className="planet">
        <div className="planet__elem planet--name">{e.name}</div>
        <div className="planet__elem planet--rotation_period">{e.rotation_period}</div>
        <div className="planet__elem planet--climate">{e.climate}</div>
        <div className="planet__elem planet--gravity">{e.gravity}</div>
        <div className="planet__elem planet--created">{e.created.slice(0, 10)}</div>
        <div className="planet__elem planet--url">
          <a href={e.url} rel="noreferrer" target="_blank" className="planet__elem__link">See details</a>
        </div>
      </div>)
      : <div className="loader loader--api-connected" id="loader">
        {APIError}
        </div>}

      {planets?.length > 0
      ? <div className="pagination">
        <h3>Page: </h3>
          <div className="pagination__btns" onClick={setActualPage}>
            <button className={activePaginationBtn === 'pagination__btns--1' ? 'chosenBtn' : ""} 
            id="pagination__btns--1" onClick={() => fetchApi(1)}>1</button>
            <button className={activePaginationBtn === 'pagination__btns--2' ? 'chosenBtn' : ""} 
            id="pagination__btns--2" onClick={() => fetchApi(2)}>2</button>
            <button className={activePaginationBtn === 'pagination__btns--3' ? 'chosenBtn' : ""} 
            id="pagination__btns--3" onClick={() => fetchApi(3)}>3</button>
            <button className={activePaginationBtn === 'pagination__btns--4' ? 'chosenBtn' : ""} 
            id="pagination__btns--4" onClick={() => fetchApi(4)}>4</button>
            <button className={activePaginationBtn === 'pagination__btns--5' ? 'chosenBtn' : ""} 
            id="pagination__btns--5" onClick={() => fetchApi(5)}>5</button>
            <button className={activePaginationBtn === 'pagination__btns--6' ? 'chosenBtn' : ""} 
            id="pagination__btns--6" onClick={() => fetchApi(6)}>6</button>
          </div> 
      </div> : null }
    </div>
    </div>
  );
}

export default App;
