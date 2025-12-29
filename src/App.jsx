import { useState } from 'react'
import Header from './components/Header';
import './components/Header.css';
import Footer from './components/Footer';
import './index.css';
import './App.css';
import './components/Footer.css';

function App() {
  return (
    <div>
      {/* 2. 헤더 사용하기 (태그 넣기) */}
      <Header /> 
      
      {/* 아래는 임시 본문 */}
      <main style={{ padding: '20px' }}>
        <h2>화면에 헤더가 잘 나왔나요?</h2>
      </main>
      <Footer/>
    </div>
  )
}

export default App
