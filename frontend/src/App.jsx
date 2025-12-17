import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Results from "./pages/Results";
import History from "./pages/History";
import DoctorSuggestions from "./pages/DoctorSuggestions";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [navigationStack, setNavigationStack] = useState([]); // New state for navigation stack
  const [suggestions, setSuggestions] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || "user_" + Date.now()
  );
  const [reports, setReports] = useState([]);

  React.useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  // New navigation function to manage history stack
  const navigateTo = (page) => {
    setNavigationStack((prevStack) => [...prevStack, currentPage]);
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    if (navigationStack.length > 0) {
      const previousPage = navigationStack[navigationStack.length - 1];
      setNavigationStack((prevStack) =>
        prevStack.slice(0, prevStack.length - 1)
      );
      setCurrentPage(previousPage);
    } else {
      setCurrentPage("home"); // Default to home if no history
    }
  };

  const handleSuggestions = async (symptoms, freeText) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms, freeText, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
      setRiskLevel(data.riskLevel);
      setDisclaimer(data.disclaimer);
      setUserInput(data.userInput);

      // Save to localStorage
      const newReport = {
        id: Date.now().toString(),
        userId: userId,
        userInput: data.userInput,
        symptoms: data.userInput,
        riskLevel: data.riskLevel,
        suggestions: data.suggestions,
        disclaimer: data.disclaimer,
        timestamp: new Date().toISOString(),
      };

      const existingReports = JSON.parse(
        localStorage.getItem("symptomReports") || "[]"
      );
      existingReports.push(newReport);
      localStorage.setItem("symptomReports", JSON.stringify(existingReports));

      navigateTo("results"); // Use navigateTo instead of setCurrentPage
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewHistory = () => {
    setIsLoading(true);
    try {
      // Get reports from localStorage
      const allReports = JSON.parse(
        localStorage.getItem("symptomReports") || "[]"
      );
      // Filter by current userId
      const userReports = allReports.filter(
        (report) => report.userId === userId
      );
      setReports(userReports);
      navigateTo("history"); // Use navigateTo instead of setCurrentPage
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReport = (reportId) => {
    try {
      // Remove from localStorage
      const allReports = JSON.parse(
        localStorage.getItem("symptomReports") || "[]"
      );
      const updatedReports = allReports.filter(
        (report) => report.id !== reportId
      );
      localStorage.setItem("symptomReports", JSON.stringify(updatedReports));

      // Update state
      setReports(reports.filter((r) => r.id !== reportId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewReport = (report) => {
    setSuggestions(report.suggestions);
    setRiskLevel(report.riskLevel);
    setDisclaimer(report.disclaimer);
    setUserInput(report.userInput);
    navigateTo("results"); // Use navigateTo instead of setCurrentPage
  };

  const handleNavigate = (page) => {
    if (page === "home") {
      navigateTo("home"); // Use navigateTo
    } else if (page === "history") {
      handleViewHistory(); // This already calls navigateTo internally
    } else if (page === "doctor") {
      navigateTo("doctor"); // Use navigateTo
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <div className="app-content">
        {currentPage === "home" && (
          <Home
            onSubmit={handleSuggestions}
            isLoading={isLoading}
            onViewHistory={handleViewHistory}
          />
        )}
        {currentPage === "results" && (
          <Results
            suggestions={suggestions}
            userInput={userInput}
            riskLevel={riskLevel}
            disclaimer={disclaimer}
            onBack={handleGoBack} // Changed from handleBackToHome to handleGoBack
            error={error}
          />
        )}
        {currentPage === "history" && (
          <History
            reports={reports}
            onBack={handleGoBack} // Changed from handleBackToHome to handleGoBack
            onDelete={handleDeleteReport}
            onViewReport={handleViewReport}
          />
        )}
        {currentPage === "doctor" && <DoctorSuggestions />}
      </div>
    </div>
  );
}