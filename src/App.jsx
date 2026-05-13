import React from 'react';
import Hero from './sections/Hero';
import InsuranceWizard from './sections/InsuranceWizard';
import ComparisonCards from './sections/ComparisonCards';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <InsuranceWizard />
      <ComparisonCards />
      <Footer />
    </div>
  );
}

export default App;
