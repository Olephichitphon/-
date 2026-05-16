import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import InsuranceWizard from './sections/InsuranceWizard';
import Promotions from './sections/Promotions';
import Reviews from './sections/Reviews';
import Articles from './sections/Articles';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function App() {
  // Use VITE_RECAPTCHA_SITE_KEY from .env or placeholder
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Default test key

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <InsuranceWizard />
        <Promotions />
        <Reviews />
        <Articles />
        <Contact />
        <Footer />
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default App;
