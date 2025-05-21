import { Text } from '@mantine/core';

const TicketItem = ({
  description,
  title,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <Text style={{ marginBlockEnd: 8 }} fw={800} size='16px'>
        {title}
      </Text>
      <Text style={{ marginBlockEnd: 24 }} fw={400} size='16px'>
        {description}
      </Text>
    </>
  );
};

export { TicketItem };
