

import './App.css'
import { PaystackButton } from 'react-paystack';
  
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
  };
  
  function App() {
    // you can call this function anything
    const handlePaystackSuccessAction = (reference:string) => {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const componentProps = {
        ...config,
        text: 'Paystack Button Implementation',
        onSuccess: (reference:string) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src="https://www.paystack.com/images/logo.svg" className="App-logo" alt="logo" />
          <h1>Paystack Button Implementation</h1>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <PaystackButton {...componentProps} />
      </div>
    );
  }
  
  export default App;