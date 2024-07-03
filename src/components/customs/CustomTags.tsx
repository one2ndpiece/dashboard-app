import React, { ReactNode } from 'react';

interface CustomTagProps {
    children: ReactNode;
}

export const RarityLegendary: React.FC<CustomTagProps> = ({ children }) => (
    <span className="rarity-legendary">{children}</span>
);

export const SubtitleLeft: React.FC<CustomTagProps> = ({ children }) => (
    <div className="subtitle-left">{children}</div>
);

export const Silver: React.FC<CustomTagProps> = ({ children }) => (
    <span className="silver">{children}</span>
);