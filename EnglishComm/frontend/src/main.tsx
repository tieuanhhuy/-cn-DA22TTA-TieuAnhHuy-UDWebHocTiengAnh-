// frontend/src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'
import VocabularyTopics from './pages/VocabularyTopics'        
import VocabularyDetail from './pages/VocabularyDetail'
import ConversationTopics from './pages/ConversationTopics'
import ConversationDetail from './pages/ConversationDetail'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* TỪ VỰNG */}
        <Route path="/vocabulary-topics" element={<VocabularyTopics />} />
        <Route path="/vocabulary/:topicId" element={<VocabularyDetail />} />

        {/* GIAO TIẾP */}
        <Route path="/conversation-topics" element={<ConversationTopics />} />
        <Route path="/conversation/:topicId" element={<ConversationDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)