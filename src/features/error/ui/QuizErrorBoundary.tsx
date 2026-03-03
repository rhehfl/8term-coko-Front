import { PropsWithChildren, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const NotFound = lazy(() => import('@/features/error/ui/NotFound'));

export default function QuizErrorBoundary({ children }: PropsWithChildren) {
  return <ErrorBoundary FallbackComponent={NotFound}>{children}</ErrorBoundary>;
}
