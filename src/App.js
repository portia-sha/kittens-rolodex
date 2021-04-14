import React from 'react';
import './App.css';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
    // this.handleChange= this.handleChange.bind(this);
  }

  // lifecyle Method: fetch elements from url when mount component
  componentDidMount() {
    // what fetch return is a promise
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  // another way to due with this.state is use arrow function
  // which means that it automatically bind this as whole component to arrow function
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  // if we just simply write this method, react actually think 'this' is undefined, therefore has to be explicitly defined
  // So we need bind function in the constructor.
  // handleChange(event) {
  //   this.setState({ searchField: event.target.value });
  // }

  render() {
    const { monsters, searchField } = this.state;
    // The filter() method creates a new array with all elements that PASS the test implemented by the provided function
    // includes() determines whether or not an array includes a certain value, return a Boolean value
    const filteredKitten = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className='App'>
        <h1>Kittens Rolodex</h1>
        <SearchBox
          type='search'
          placeholder='Search Kittens'
          onSearchChange={this.onSearchChange}
        />
        <CardList monsters={filteredKitten} />
      </div>
    );
  }
}

export default App;
