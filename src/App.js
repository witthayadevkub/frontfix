import React from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { ProducD } from "./pages/details/ProducD"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import { CreateProduct } from "./components/create/CreateProduct"
import { Product } from "./components/product/Product"
import  Orders  from "./components/orders/orders"

import { useContext } from "react"
import { Context } from "./context/Context"
const App = () => {
  const { user } = useContext(Context)
  
  function UnAuthApp() {
    return (
      <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Regsiter} />
      </Switch>
      <Footer />
    </Router>
    )
}

function AuthApp() {
  return (
    <Router>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Regsiter} />
      <Route exact path='/post/:id' component={DetailsPages} />
      <Route exact path='/product/:id' component={ProducD} />
      <Route exact path='/account' component={Account} />
      <Route exact path='/create' component={Create} />
      <Route exact path='/createproduct' component={CreateProduct} />
      <Route exact path='/shops' component={Product} />
      <Route exact path='/orders' component={Orders} />
    </Switch>
    <Footer />
  </Router>
  )
}


  return (
    <>
      {!user ? <UnAuthApp /> : <AuthApp />}
    </>
  )
}
export default App