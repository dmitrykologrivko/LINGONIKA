import {
  Component,
  PropsWithChildren,
  ReactElement,
  ErrorInfo,
} from 'react';
import { ErrorView } from '@/components';
import { translate } from '@/utils';

type ErrorBoundaryProps = {
  fallback?: (error: unknown, errorInfo: ErrorInfo, handleRetry: () => void) => ReactElement;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: unknown;
  errorInfo: ErrorInfo | null;
};

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
    this.setState(prevState => ({ ...prevState, error, errorInfo }));
  }

  handleRetry ()  {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  getErrorStack() {
    if (typeof this.state.error === 'string') {
      return this.state.error;
    }

    if (this.state.error instanceof Error) {
      return this.state.error.stack;
    }

    return String(this.state.error);
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (fallback) {
        return fallback(
          this.state.error!,
          this.state.errorInfo!,
          this.handleRetry,
        );
      }

      // Default fallback UI
      return (
        <div className='w-lvw h-lvh'>
          <ErrorView errorMessage={translate('unknownError', { ns: 'errors' })} bordered={false}
                     handleRetry={() => window.location.reload()}>
            {process.env.NODE_ENV === 'development' && (
              <div className='p-4 bg-gray-200 rounded w-[21rem] h-[21rem] md:w-full md:h-full overflow-scroll'>
                {this.getErrorStack()}
              </div>
            )}
          </ErrorView>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
