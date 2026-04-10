import { Navigate, Route, Routes } from 'react-router-dom';
import { LoadingScreen } from './components/features/LoadingScreen';
import { Shell } from './components/shell/Shell';
import { DecoderScreen } from './screens/DecoderScreen';
import { HomeScreen } from './screens/HomeScreen';
import { HowSageWorksScreen } from './screens/HowSageWorksScreen';
import { HubScreen } from './screens/HubScreen';
import { ResultScreen } from './screens/ResultScreen';

function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<HomeScreen />} />
        <Route path="/search/loading" element={<LoadingScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/decoder" element={<DecoderScreen />} />
        <Route path="/hub" element={<HubScreen />} />
        <Route path="/how-sage-works" element={<HowSageWorksScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
