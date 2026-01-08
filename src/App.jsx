import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritePage from './pages/PostWritePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './index.css';
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 min-h-[calc(100vh-10rem)]">
          <Routes>
            <Route path="/" element={<Navigate to="/jaram/board/posts" replace />} />
            <Route path="/jaram/board/posts" element={<PostListPage />} />
            <Route path="/jaram/board/posts/:id" element={<PostDetailPage />} />
            <Route path="/jaram/board/write" element={<PostWritePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// 404 페이지 컴포넌트
function NotFound() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem',
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#E30613' }}>404</h1>
      <p style={{ fontSize: '1.5rem', color: '#333', marginBottom: '2rem' }}>페이지를 찾을 수 없습니다</p>
      <a href="/" style={{
        color: '#E30613',
        textDecoration: 'none',
        fontSize: '1.1rem',
        padding: '0.8rem 2rem',
        border: '2px solid #E30613',
        borderRadius: '4px'
      }}>
        메인으로 돌아가기
      </a>
    </div>
  );
}

export default App
