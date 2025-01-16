import { Toast, Button, Alert, } from 'react-daisyui';
import { useAlerts } from './AlertsContext.tsx';

function AlertsRenderer() {
  const alerts = useAlerts();
  return (
    <Toast>
      {alerts.alertsList.map((alert) => (
        <Alert key={alert.id} status={alert.status} >
          <div className="w-full flex items-center justify-between">
            <div className='grow'>{alert.text}</div>
            {alert.cancellable && (
              <Button size='sm' color="ghost" onClick={() => alerts.clearAlert(alert.id)}>
                X
              </Button>
            )}
          </div>

        </Alert>
      ))}
    </Toast>
  );
}

export default AlertsRenderer;
