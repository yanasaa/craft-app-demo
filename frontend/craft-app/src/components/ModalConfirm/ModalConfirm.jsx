import { Modal } from 'antd';

export default function ModalConfirm({setIsModalOpen, isModalOpen, message, modalAction}) {
    const handleOk = () => {
        modalAction();
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
  return (
    <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Да" cancelText="Отмена">
        <p>{message}</p>
   </Modal>
  )
}
