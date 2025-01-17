export type Alert = {
  id: string;
  text: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  cancellable?: boolean;
  autoClear?: boolean;
  autoClearTimout?: number;
};
