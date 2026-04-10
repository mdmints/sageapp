import { useToast } from '../../hooks/useToast';

export function Toast() {
  const { toast } = useToast();

  return <div className={`toast ${toast.visible ? 'show' : ''}`}>{toast.message}</div>;
}
