'use client';
import { createContext, useState } from 'react';

interface ExperienceListContextProps {
  onSelectDate: (value: string | null) => void;
  selectedDate: string | null;
  onRemoveFilter: () => void;
}
export const ExperienceListContext = createContext<ExperienceListContextProps>({
  onSelectDate: () => {},
  selectedDate: null,
  onRemoveFilter: () => {},
});

export const ExperienceListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDate, onSelectDate] = useState<string | null>(null);
  const handleOnSelectDate = (value: string | null) => {
    onSelectDate(value);
  };
  const onRemoveFilter = () => {
    onSelectDate(null);
  };

  return (
    <ExperienceListContext.Provider
      value={{
        selectedDate,
        onSelectDate: handleOnSelectDate,
        onRemoveFilter,
      }}
    >
      {children}
    </ExperienceListContext.Provider>
  );
};
