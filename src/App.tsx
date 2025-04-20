import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { TopStories } from "@/components/home/TopStories";
import EPharmacy from "@/epharmacy/EPharmacy";
import News from "@/news/News";
import SymptomChecker from "@/symptoms-checker/pages/SymptomChecker";
import SymptomResults from "@/symptoms-checker/pages/Results";
import DoctorsList from "@/doctors/pages/DoctorsList";
import BookAppointment from "@/doctors/pages/BookAppointment";
import AppointmentConfirmation from "@/doctors/pages/AppointmentConfirmation";
import CareersPage from "@/careers/pages/CareersPage";
import LoginPage from "@/auth/pages/Login";
import RegisterPage from "@/auth/pages/Register";
import Dashboard from "@/auth/pages/Dashboard";

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <TopStories />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/epharmacy" element={<EPharmacy />} />
            <Route path="/news" element={<News />} />
            <Route path="/symptoms-checker" element={<SymptomChecker />} />
            <Route path="/symptoms-checker/results" element={<SymptomResults />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/doctors/book/:id" element={<BookAppointment />} />
            <Route path="/doctors/confirmation" element={<AppointmentConfirmation />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
