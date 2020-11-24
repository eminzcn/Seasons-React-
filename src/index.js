import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from './SeasonDisplay';
import Spinner from "./Spinner";

class App extends React.Component {

  // constructor(props) {
  //   super(props);

  //   // state ifadesi, sadece constructor içerisinde doğrudan atanır ! Onun dışında setState methodu ile atanır!
  //   this.state = { lat: null, errorMessage: "" };
  // }

  // Constructor'ın yaptığı işi yapan kod. (Babel,  tarayıcıya zaten yukarıdaki gibi gönderiyor.)
  state =  { lat: null, errorMessage: ''};

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }  

  renderContent(){
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error : {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="Please accept location request" />;
  }

  // React says we have to define render!!
  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

// return (
//   <div>
//     Latitude : {this.state.lat}
//     <br />
//     Error : {this.state.errorMessage}
//   </div>
// );

// componentDidMount(){
//   compenent'a bir istek gitti mi, component çağırıldı mı sorgusu
// }

// componentDidUpdate(){
//   component'a giden istekle component içinde bir şey mi değişti sorgusu. bu method çağırıldıktan sonra component bir kere daha güncellenir.
// }

// componentWillUnmount(){
//   component, gösterilmeyi bırakılsın mı sorgusu
// }