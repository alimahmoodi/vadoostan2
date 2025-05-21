import { Button, Modal, Space, Textarea } from '@mantine/core';
import { TextInput } from '../components';
import { useState } from 'react';

export const NewFaqModal = ({
  onClosed,
  opened,
  onConfirm,
}: {
  opened: boolean;
  onClosed: () => void;
  onConfirm: (args: { question: string; answer: string }) => void;
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnwser] = useState('');
  const handleOnConfirm = () => {
    onConfirm({ answer: answer, question: question });
  };

  return (
    <Modal
      styles={{
        inner: {
          left: 0,
        },
      }}
      opened={opened}
      onClose={onClosed}
      title='افزدون سوالات متداول جدید'
    >
      <div style={{ width: '100%' }}>
        <TextInput
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          value={question}
        />
        <Space h='md' />
        <Textarea
          onChange={(e) => {
            setAnwser(e.target.value);
          }}
          value={answer}
          rows={6}
        />
        <Button onClick={handleOnConfirm}>تایید</Button>
      </div>
    </Modal>
  );
};
