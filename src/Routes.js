
import {  Switch } from 'react-router';
import { Route,BrowserRouter as Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Work from './components/Work/work'
import About from './components/About/about'
import Blog from './components/Blogs/blog'
import Test from './components/Testhub/testhub'
import Footer from './components/Footer/footer'
import {firebase as firebaseConfig} from './firebase'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(firebaseConfig, analytics)

export default (
    <Router history={createBrowserHistory()} >
    <Navbar/>
    <Switch>
        <Route path="/" exact render={(props) => <Hero {...props} />}/>
        <Route path="/about" exact render={(props) => <About {...props} />} />
        <Route path="/work" exact render={(props) => <Work {...props} />} />
        <Route path="/blog" exact render={(props) => <Blog {...props} />} />
        <Route path="/test" exact render={(props) => <Test {...props} />} />
    </Switch>
    <Footer /> {/* Add this line to show the footer on every page */}
    </Router>
);
