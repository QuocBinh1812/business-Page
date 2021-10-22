import logo from "./logo.svg";
import "./App.css";
import TodoFeature from "./features/todo";
import AlbumFeature from "./features/Album";
import { Route, Link, NavLink, Switch, Redirect } from "react-router-dom";
import NotFound from "./component/NotFound";
import { useEffect } from "react";
import productApi from "./api/productApi";
import CounterFeature from "./features/counter";
import "./App.css";
import styled from "styled-components";
import Header from "./component/header";
import { useSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import ProductFeature from "./features/Product";
import CartFeature from "./features/Cart";

//styled-component  (css in js)
const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.color || "green"};
`;
//neu ko co prop truyen vao thi color co mau xanh

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10, //chi lay gioi han 10 thang
      };
      //const productList = await productApi.getAll();   //lay het
      const productList = await productApi.getAll(params); //neu co param thi chi lay 10 thang,ko co thi lay het
      console.log(productList);
    };
    fetchProducts();
  }, []);
  const { enqueueSnackbar } = useSnackbar(); // dung de show thong bao noti stack
  const shownotication = () => {
    enqueueSnackbar("register succesfully", { variant: "success" });
  };

  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/business-Page" to="/products" exact />
        {/* <Redirect from="/post-list/:postId" to="/posts/:postId" /> */}
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} exact />
        <Route path="/products" component={ProductFeature}></Route>
        <Route path="/cart" component={CartFeature} />
        {/* <Route path="/" component={CounterFeature} /> */}

        {/* path="/" nen de cuoi cung de khi su dung useRouteMacth trong component con ko biet an dau / */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
//nav link se co Active thuong dung lam menu ,Link ko co active
//<Route path="/albums" component={AlbumFeature} />
// switch chi render Route co path giong url dau tien ,cai thu 2 giong se ko render
// exact dung duong dan moi render ,ko exact se render voi url start with part  (todos/hhah/1)
export default App;
