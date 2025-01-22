import Provider from './Provider';
import ErrorBoundary  from './ErrorBoundary.tsx';

function App() {
  return (
    <ErrorBoundary>
      <Provider/>
    </ErrorBoundary>
  );
}

export default App;
