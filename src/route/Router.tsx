import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, useState, useEffect } from 'react';
import QuizErrorBoundary from '@/features/error/ui/QuizErrorBoundary';

const NotFound = lazy(() => import('@features/error/ui/NotFound'));
const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const Learn = lazy(() => import('@/pages/learn/Learn'));
const Quest = lazy(() => import('@/pages/quest/Quest'));
const Ranking = lazy(() => import('@/pages/ranking/Ranking'));
const Quiz = lazy(() => import('@/pages/quiz/Quiz'));
const Store = lazy(() => import('@/pages/store/Store'));
const Profile = lazy(() => import('@/pages/profile/Profile'));
const Creators = lazy(() => import('@/pages/creators/Creators'));
const Intro = lazy(() => import('@/pages/intro/Intro'));
const TermsOfService = lazy(() => import('@/pages/terms-of-service/TermsOfService'));
const QuizTutorialPage = lazy(() => import('@/pages/quiz/tutorial/QuizTutorialPage'));
const LearnTutorialPage = lazy(() => import('@/pages/learn/tutorial/LearnTutorialPage'));

const InitialRouteRedirect = () => {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('visited');
    const redirectPath = hasVisited ? '/learn' : '/intro';

    if (!hasVisited) {
      localStorage.setItem('visited', 'true');
    }

    setRedirectTo(redirectPath);
  }, []);

  if (!redirectTo) return null;

  return <Navigate to={redirectTo} replace />;
};

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<InitialRouteRedirect />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/quest" element={<Quest />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/intro/creators" element={<Creators />} />
      <Route
        path="/quiz"
        element={
          <QuizErrorBoundary>
            <Quiz />
          </QuizErrorBoundary>
        }
      />
      <Route path="/store" element={<Store />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/quiz/tutorial" element={<QuizTutorialPage />} />
      <Route path="/learn/tutorial" element={<LearnTutorialPage />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
