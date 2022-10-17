import React, { useEffect } from 'react';
import './App.css';
import { Button } from "@mantine/core"
import Header from './components/header';
import { Route, Routes } from 'react-router-dom'
import Products from './products';
import ShoppingBag from './views/shopping';
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { loadState } from './utils/storage';
import { setStorage } from './utils/local-storage';

function App() {
  useEffect(() => {
    if (!loadState('products') && !loadState('products')) {
      setStorage('products', [])
    }
    console.log('render')
  }, [])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/shopping-bag" element={<ShoppingBag />} />
      </Routes>
      <Button my={30} onClick={() => window.open('https://github.com/Sardo0r')} variant="gradient" leftIcon={<GitHubLogoIcon />}>Sardo0r</Button>

    </div>
  );
}

export default App;
