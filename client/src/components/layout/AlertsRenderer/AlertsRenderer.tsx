import { useEffect, useState } from 'react';
import { Toast, Button, Alert, } from 'react-daisyui';
import { generateUUID } from '@/utils';
import { useAlertsManager } from '@/hooks';
import { Alert as AlertObj } from '@/utils/alerts';

function AlertsRenderer() {
  const [alerts, setAlerts] = useState<AlertObj[]>([]);
  const alertsManager = useAlertsManager();

  useEffect(() => {
    const OBSERVER_ID = generateUUID();

    alertsManager.subscribe({
      id: OBSERVER_ID,
      alertsUpdated: () => {
        setAlerts(alertsManager.getAlerts());
      },
    })

    return () => {
      alertsManager.unsubscribe(OBSERVER_ID);
    };
  }, [alertsManager]);

  return (
    <Toast>
      {alerts.map((alert) => (
        <Alert className='flex' key={alert.id} status={alert.status}>
          <div className="w-full flex items-center justify-between">
            <div className='min-w-32 text-white'>{alert.text}</div>
            {alert.cancellable && (
              <Button className='text-white' size='sm' color="ghost"
                      onClick={() => alertsManager.clearAlert(alert.id)}>
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
