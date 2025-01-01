import { App } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import type { NotificationInstance } from "antd/es/notification/interface";

let message: MessageInstance;
let notification: NotificationInstance;
let Modal: Omit<ModalStaticFunctions, "warn">;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  notification = staticFunction.notification;
  Modal = staticFunction.modal;
  return null;
};

export { message, notification, Modal };
