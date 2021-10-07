import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from './pages/login'
import Chat from './pages/chat'

const MainRouter = () => {
    return (

        <Router>
            <Switch>
                <Route exact path="/" component={Login}>
                    <Login/>
                </Route>
                <Route exact path="/chat" component={Chat}>
                    <Chat/>
                </Route>
            </Switch>
        </Router>

    );
  }
  
  export default MainRouter;