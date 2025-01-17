import { Alert } from './alert.type';
import { generateUUID } from '../generate-uuid.util';

type NewAlert = Partial<Pick<Alert, 'id'>> & Omit<Alert, 'id'>;

type AlertsObserver = {
  id: string;
  alertsUpdated: () => void;
};

export class AlertsManager {
  private alerts: Alert[];
  private observers: AlertsObserver[];

  constructor(
    private readonly autoClearTimout?: number,
  ) {
    this.alerts = [];
    this.observers = [];
    this.autoClearTimout = autoClearTimout || 5000;
  }

  private scheduleAutoClear(alert: Alert) {
    if (alert.autoClear) {
      setTimeout(() => {
        this.clearAlert(alert.id);
      }, alert.autoClearTimout || this.autoClearTimout);
    }
  }

  public getAlerts() {
    return this.alerts;
  }

  public addAlert(alert: NewAlert) {
    const newAlert: Alert = {
      ...alert,
      id: alert.id || generateUUID(),
      status: alert.status || 'info',
      cancellable: alert.cancellable !== undefined ? alert.cancellable : true,
      autoClear: alert.autoClear !== undefined ? alert.autoClear : true,
    }

    this.alerts.push(newAlert);
    this.scheduleAutoClear(newAlert);
    this.notifyObservers();
  }

  public clearAlert(id: string) {
    this.alerts = this.alerts.filter(alert => alert.id !== id);
    this.notifyObservers();
  }

  public clearAllAlerts() {
    this.alerts = [];
    this.notifyObservers();
  }

  public subscribe(observer: AlertsObserver) {
    this.observers.push(observer);
  }

  public unsubscribe(id: string) {
    this.observers = this.observers.filter(observer => observer.id !== id);
  }

  public notifyObservers() {
    this.observers.forEach(observer => observer.alertsUpdated());
  }
}
