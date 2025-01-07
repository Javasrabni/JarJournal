import './App.css';
import { Route, Routes, BrowserRouter, } from 'react-router-dom';

// Context
import UserQuoteProvider from './Comps/Footer/userQuote/userQuoteContext';
import MemoProvider from './Comps/Features/Memo/MemoContext';
import { PopupFrSettingsProvider } from './Comps/Popup_settings/popupSetting/boxPopupFromSetting';
import MusicBoxProvider from './Comps/Footer/musicBox/musicBoxContext';
import ThemeAppProvider from './Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext';
import BrainFProvider from './Comps/Features/brainFocus/BrainFContext';
import ToggleAllProvider from './Comps/toggle/toggleContext';
import AnimateLoadPageProvider from './Comps/animate onload page/animateLoadPage';
import CatatanProvider from './Comps/Features/Catatan/catatanContex';
import WriteNoteProvider from './Comps/Features/Catatan/onNewNotePage/writeNoteContext';
import API_URL_PROVIDER from './Auth/Context/API_URL';
import ArtikelProvider from './Comps/Features/Publikasi/Context/artikelContext';
import OnEditNoteProvider from './Comps/Features/Catatan/onEditNote/onEditNContext';
import OVERALL_CONTEXT_PROVIDER from './Context/OVERALL_CONTEXT';
import ExploreProvider from './Pages/explore/Context/exploreContext';
import UserProfileProvider from './Pages/userProfile/Context/userProfileContext';
import ChosseAvatarProvider from './introWeb/chooseAvatar/Context/choseAvtContext';
import { OnEditUserProfileProvider } from './Pages/userProfile/Context/onEditUserProfileCTX';
import JurnalContextProvider from './Comps/Features/Jurnal/Context/jurnalContext';

// Components
import Home from './home';
import AuthForm from './Comps/Form/AuthForm';
import CodeBaseFeatures from './Comps/Features/codeBaseFeatures';
import Page404 from './Comps/404/404Page';
import BrainFocusPage from './Comps/Features/brainFocus/displayPage/brainFocusPage';
import KalenderPage from './Comps/Features/kalender/kalenderPage/Kalender';
import LoginPage from './Auth/loginPage/loginPage';
import AuthPage from './Auth/authPage';
import LandingPage from './landingPage';
import ArtikelForm from './Comps/Features/Publikasi/pubPage/artikelForm';
import Publikasi from './Comps/Features/Publikasi/pubPage/publikasi';
import SelectedPub from './Comps/Features/Publikasi/pubPage/selectedPub';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Chatbot from './ChatBot/BotJarjournal';
import Explore from './Pages/explore/explore';
import UserProfile from './Pages/userProfile/userProfile';
import EditProfilePage from './Pages/userProfile/userEditProfileForm/editProfilePage';
import JurnalPage from './Pages/Jurnal/jurnalPage';

function App() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <API_URL_PROVIDER>
        <OVERALL_CONTEXT_PROVIDER>
          <JurnalContextProvider>
            <ChosseAvatarProvider>
              <UserProfileProvider>
                <OnEditUserProfileProvider>
                  <ArtikelProvider>
                    <ExploreProvider>
                      <OnEditNoteProvider>
                        <UserQuoteProvider>
                          <MemoProvider>
                            <PopupFrSettingsProvider>
                              <MusicBoxProvider>
                                <ThemeAppProvider>
                                  <BrainFProvider>
                                    <ToggleAllProvider>
                                      <AnimateLoadPageProvider>
                                        <CatatanProvider>
                                          <WriteNoteProvider>
                                            <BrowserRouter>
                                              <Routes>

                                                <Route index element={<LandingPage />} />
                                                <Route path='/Auth' element={<AuthPage />} />
                                                <Route path='/dashboard' element={<Home />} />
                                                <Route path='/Explore' element={<Explore />} />
                                                <Route path='/user/:usernameId' element={<UserProfile />} />
                                                <Route path='/:user/profile/edit' element={<EditProfilePage />} />
                                                <Route path='/ftr/:id' element={<CodeBaseFeatures />} />
                                                <Route path='/Jurnal/:index/:desc' element={<JurnalPage />} />
                                                <Route path='/BrainFocus' element={<BrainFocusPage />} />
                                                <Route path='/clips/publish' element={<ArtikelForm />} />
                                                <Route path='/KalenderPlanner' element={<KalenderPage />} />
                                                <Route path='/JJR-ChatBot' element={<Chatbot />} />

                                                {/* Publikasi link */}
                                                <Route path='/posts/:id' element={<SelectedPub />} />
                                                <Route path='*' element={<Page404 />} />

                                              </Routes>
                                            </BrowserRouter>
                                          </WriteNoteProvider>
                                        </CatatanProvider>
                                      </AnimateLoadPageProvider>
                                    </ToggleAllProvider>
                                  </BrainFProvider>
                                </ThemeAppProvider>
                              </MusicBoxProvider>
                            </PopupFrSettingsProvider>
                          </MemoProvider>
                        </UserQuoteProvider>
                      </OnEditNoteProvider>
                    </ExploreProvider>
                  </ArtikelProvider>
                </OnEditUserProfileProvider>
              </UserProfileProvider>
            </ChosseAvatarProvider>
          </JurnalContextProvider>
        </OVERALL_CONTEXT_PROVIDER>
      </API_URL_PROVIDER>
    </SkeletonTheme >
  );
}

export default App;
