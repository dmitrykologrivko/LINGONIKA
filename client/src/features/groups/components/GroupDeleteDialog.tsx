import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from '@/components';
import { deleteGroup } from '@/api';
import { useApiClient } from '@/hooks';

type GroupDeleteDialogProps = {
  show: boolean;
  groupId: number;
  onClose: () => void;
  onSuccessDeletion: () => void;
};

function GroupDeleteDialog({ show, groupId, onClose, onSuccessDeletion }: GroupDeleteDialogProps) {
  const { t } = useTranslation();
  const { Dialog } = Modal.useDialog();

  const apiClient = useApiClient();
  const deleteMutation = useMutation({
    mutationFn: () => deleteGroup(groupId, apiClient),
  })

  const onDeleteGroup = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: onSuccessDeletion,
    });
  };

  return (
    <Dialog open={show}>
      <Modal.Header className="font-bold">{t('deleteGroupTitle', { ns: 'groups' })}</Modal.Header>
      <Modal.Body>{t('deleteGroupMessage', { ns: 'groups' })}</Modal.Body>
      <Modal.Actions>
        <div className='flex gap-2'>
          <Button color='neutral' onClick={onClose}>
            {t('cancel', { ns: 'actions' })}
          </Button>
          <Button color='error' onClick={onDeleteGroup} disabled={deleteMutation.isPending}>
            {t('delete', { ns: 'actions' })}
          </Button>
        </div>
      </Modal.Actions>
    </Dialog>
  );
}

export default GroupDeleteDialog;
