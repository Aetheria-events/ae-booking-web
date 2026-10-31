import { Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivacyDialog from './components/PrivacyDialog';
import { useScrollToTop } from './lib/hooks';
import About from './pages/About';
import Booking from './pages/Booking';
import EventDemo from './pages/EventDemo';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Packages from './pages/Packages';
import Privacy from './pages/Privacy';
import SitePlan from './pages/SitePlan';
import Terms from './pages/Terms';

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function SiteLayout() {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />

      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="packages" element={<Packages />} />
          <Route path="booking" element={<Booking />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="site-plan" element={<SitePlan />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="invitation" element={<EventDemo />} />
      </Routes>

      <PrivacyDialog />
    </>
  );
}
