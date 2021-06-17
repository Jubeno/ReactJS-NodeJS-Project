import './App.css';
import { withNamespaces } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import Top from './modules/Top';
import PrivateRoute from './main/routes/PrivateRoute';
import Home from './modules/Home';
import Timeline from './modules/Timeline';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './library/common/components/Toast/Toast';
import { ReactQueryDevtools } from 'react-query/devtools'

// Create a client
const queryClient = new QueryClient()

function App({ t }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      <Router>
      
        <Switch>
          <Route exact path='/' component={Top} />
          <PrivateRoute exact path='/homepage' component={Home} />
          <PrivateRoute exact path='/timeline' component={Timeline} />
          {/* <Redirect from="/" to="/homepage" exact/> */}
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default withNamespaces()(App);