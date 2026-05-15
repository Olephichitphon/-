import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import InsuranceWizard from './sections/InsuranceWizard';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <InsuranceWizard />
      <Footer />
    </div>
  );
}

export default App;
