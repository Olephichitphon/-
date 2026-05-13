import React from 'react';
import Hero from './sections/Hero';
import InsuranceWizard from './sections/InsuranceWizard';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <InsuranceWizard />
      <Footer />
    </div>
  );
}

export default App;
