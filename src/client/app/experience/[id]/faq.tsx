import { ExperienceDetailResponse } from '@/services/services';
import { Accordion } from '@mantine/core';

export const Faq = ({
  faqs,
}: {
  faqs: ExperienceDetailResponse['result']['faqs'] | undefined;
}) => {
  return (
    <Accordion>
      {(faqs || []).map(({ answer, question }, index) => {
        return (
          <Accordion.Item
            styles={{
              item: {
                ...(index === (faqs || []).length - 1 && {
                  borderBottom: 'none',
                }),
              },
            }}
            value={String(index)}
            key={index}
          >
            <Accordion.Control>{question}</Accordion.Control>
            <Accordion.Panel>{answer}</Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
