import './App.css';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Context
import UserQuoteProvider from './Comps/Footer/userQuote/userQuoteContext';
import MemoProvider from './Comps/Features/Memo/MemoContext';
import { PopupFrSettingsProvider } from './Comps/Popup_settings/popupSetting/boxPopupFromSetting';
import MusicBoxProvider from './Comps/Footer/musicBox/musicBoxContext';

// Components
import AuthForm from './Comps/Form/AuthForm';
import Home from './home';
import CodeBaseFeatures from './Comps/Features/codeBaseFeatures';
import Page404 from './Comps/404/404Page';
import BrainFocusPage from './Comps/Features/brainFocus/displayPage/brainFocusPage';

function App() {
  return (
    <UserQuoteProvider>
      <MemoProvider>
        <PopupFrSettingsProvider>
          <MusicBoxProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path='/ftr/:id' element={<CodeBaseFeatures />} />
                <Route path='/BrainFocus' element={<BrainFocusPage />} />
                <Route path='*' element={<Page404 />} />
              </Routes>
            </BrowserRouter>
          </MusicBoxProvider>
        </PopupFrSettingsProvider>
      </MemoProvider>
    </UserQuoteProvider>
  );
}

export default App;
