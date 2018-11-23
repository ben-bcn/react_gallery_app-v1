// https://github.com/ivansard/Treehouse-Project-9/tree/master/react-gallery/src
import React, { Component } from 'react';
import config from './config';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// Import Components
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';
import Nav from './components/Nav';

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      sunsetPhotos: [],
      dogPhotos: [],
      muppetPhotos: [],
      loading: true,
      pageLoaded: false,
      query: ''
    };

  }

  // componentDidMount is called after a component is added to the DOM
  async componentDidMount() {
    // If the page has not previously loaded then get our photos data
    if(!this.state.pageLoaded){
      this.performSearch();
      this.setSunsetData();
      this.setDogData();
      this.setMuppetData();
    }
  }

  componentDidUpdate(){
    // if BACK or FORWARD are clicked in browser, ensure we reload the images
    window.onpopstate  = (e) => {
      this.performSearch();
   }
 }

  // this is to assist with correct behaviour on page loads for /search/ routes
  splitURL(url){
    let UrlParts = url.substring(1).split('/');
    return UrlParts;
  }


  // Runs on page load with default val of flowers, then used for searches
  performSearch = (query = 'flowers', fromSearch = false) => {

    // When the search form is used the loading state will be false
    // Change loading to true so we see the loading msg while waiting on images
    if(!this.state.loading) {
      this.setState({
        loading: true
      });
    }

    let getUrlData = this.splitURL(window.location.pathname);
    // if we have muliple URL params & are not from a search action, reset the query based on URL
    // an example is if /search/birds is entered into the browser and loaded, otherwise 'flowers' would load
    if(getUrlData.length > 1 && !fromSearch){
      query = getUrlData[1];
    }

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&text=${query}&per_page=24&format=json&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
        this.setState({
           photos: response.data.photos.photo,
           loading: false,
           pageLoaded: true,
           query: query
        });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  }

  setSunsetData = (query) => {

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&text=sunset&per_page=24&format=json&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
         this.setState({
           sunsetPhotos: response.data.photos.photo
         });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  setDogData = (query) => {

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&text=dogs&per_page=24&format=json&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
         this.setState({
           dogPhotos: response.data.photos.photo
         });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  setMuppetData = (query) => {

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&text=muppets&per_page=24&format=json&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
         this.setState({
           muppetPhotos: response.data.photos.photo
         });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">

          <Route path="/" render={(props) => <SearchForm {...props} onSearch={this.performSearch} />} />
          {/* Load the name buttons */}
          <Nav />
          {/* Load the context sensitive routes */}
          <Switch>
            <Route exact path="/" render={(props) => <Gallery {...props} title="flowers" loading={this.state.loading} photos={this.state.photos} />} />
            <Route path="/sunset" render={(props) => <Gallery {...props} title="sunset" loading={this.state.loading} photos={this.state.sunsetPhotos} />} />
            <Route path="/dogs" render={(props) => <Gallery {...props} title="dogs" loading={this.state.loading} photos={this.state.dogPhotos} />} />
            <Route path="/muppets" render={(props) => <Gallery {...props} title="muppets" loading={this.state.loading} photos={this.state.muppetPhotos} />}  />
            <Route exact path="/search/:query" render={(props) => <Gallery {...props} onSearch={this.performSearch} currentQuery={this.state.query} loading={this.state.loading} photos={this.state.photos} />} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
