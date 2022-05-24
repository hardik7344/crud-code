import logo from "./logo.svg";
import "./App.css";
import { Function } from "./component/Function";
import { AddData } from "./component/Function";
import EventHendalar from "./component/EventHendalar";

function App() {
  return (
    <div className="App">
      {/* //<Function />
     // <AddData /> */}
     <EventHendalar/>
     
    </div>
  );
}

export default App;
