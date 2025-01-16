import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from 'react';
import { generateUUID } from '@/utils';

type Alert = {
  id: string;
  text: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  cancellable?: boolean;
  autoClear?: boolean;
  autoClearTimout?: number;
};

type NewAlert = Partial<Pick<Alert, 'id'>> & Omit<Alert, 'id'>;

interface IAlertsContext {
  showAlert: (alert: NewAlert) => void;
  clearAlert: (id: string) => void;
  clearAllAlerts: () => void;
  alertsList: Alert[];
}

const AlertsContext = createContext<IAlertsContext>(undefined!);

export const useAlerts = () => useContext(AlertsContext);

type AlertsProviderProps = {
  autoClearTimout?: number;
};

export const AlertsProvider = (
  { children, autoClearTimout }: PropsWithChildren<AlertsProviderProps>
) => {
  const defaultAutoClearTimout = autoClearTimout || 5000;
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const scheduleAutoClear = (alert: Alert) => {
    if (alert.autoClear) {
      setTimeout(() => {
        clearAlert(alert.id);
      }, alert.autoClearTimout || defaultAutoClearTimout);
    }
  };

  const showAlert = (alert: NewAlert) => {
    const newAlert: Alert = {
      ...alert,
      id: alert.id || generateUUID(),
      status: alert.status || 'info',
      cancellable: alert.cancellable !== undefined ? alert.cancellable : true,
      autoClear: alert.autoClear !== undefined ? alert.autoClear : true,
    }
    setAlerts(prevState => [...prevState, newAlert]);
    scheduleAutoClear(newAlert);
  }

  const clearAlert = (id: string) => {
    setAlerts(prevState => prevState.filter(alert => alert.id !== id));
  }

  const clearAllAlerts = () => {
    setAlerts([]);
  }

  return (
    <AlertsContext.Provider value={{ showAlert, clearAlert, clearAllAlerts, alertsList: alerts }}>
      {children}
    </AlertsContext.Provider>
  );
};
