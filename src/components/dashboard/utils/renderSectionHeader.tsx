import { ReactNode } from 'react';

export const renderSectionHeader = (title: string, icon: ReactNode) => (
  <div className="flex items-center gap-2">
    {icon}
    <h2 className="text-2xl font-semibold">{title}</h2>
  </div>
);