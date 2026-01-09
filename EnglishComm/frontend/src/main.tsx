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
import AboutUs from './pages/AboutUs'
import AdminDashboard from './pages/AdminDashboard'  
import Profile from './pages/Profile'
import VocabularyAdmin from "./pages/admin/VocabularyAdmin";
import ConversationAdmin from "./pages/admin/ConversationAdmin";
import ConversationSentencesAdmin from './pages/admin/ConversationSentencesAdmin';
import VocabularyWordsAdmin from "./pages/admin/VocabularyWordsAdmin";
import PracticeSelect from './pages/PracticeSelect';
import PracticeTopicSelect from './pages/PracticeTopicSelect';
import PracticeTest from './pages/PracticeTest';
import Progress from './pages/Progress';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* TỪ VỰNG */}
        <Route path="/vocabulary-topics" element={<VocabularyTopics />} />
        <Route path="/vocabulary/:topicId" element={<VocabularyDetail />} />

        {/* GIAO TIẾP */}
        <Route path="/conversation-topics" element={<ConversationTopics />} />
        <Route path="/conversation/:topicId" element={<ConversationDetail />} />

        {/* VỀ CHÚNG TÔI */}
        <Route path="/about-us" element={<AboutUs />} />

        {/* LUYỆN TẬP - Đã sửa lỗi comment ở đây */}
        <Route path="/practice" element={<PracticeSelect />} />
        <Route path="/practice/:type" element={<PracticeTopicSelect />} />
        <Route path="/practice/:type/:topicId" element={<PracticeTest />} />
        
        {/* TIẾN ĐỘ */}
        <Route path="/progress" element={<Progress />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vocabulary" element={<VocabularyAdmin />} />
        <Route path="/admin/vocabulary/:topicId" element={<VocabularyWordsAdmin />}/>
        <Route path="/admin/conversation" element={<ConversationAdmin />} />
        <Route path="/admin/conversation/:topicId" element={<ConversationSentencesAdmin />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)