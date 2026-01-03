import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/DashboardLayout.css';

const DashboardLayout = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <div className="dashboard-layout">
            {isLoading && <LoadingSpinner fullScreen text="Loading..." />}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="content-wrapper">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
