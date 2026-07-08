import { memo, type ReactNode } from 'react';
import {
  Modal as RNModal,
  Pressable,
  type ModalProps as RNModalProps,
} from 'react-native';
import { styles } from './Modal.styles';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
} & Omit<RNModalProps, 'visible' | 'onRequestClose'>;

function ModalComponent({ visible, onClose, children, ...rest }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...rest}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.content} onPress={() => {}}>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

export const Modal = memo(ModalComponent);
