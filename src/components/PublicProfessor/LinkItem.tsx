import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LinkItemProps {
  to: string;
  children: ReactNode;
}

export default function LinkItem({ to, children }: LinkItemProps) {
  if (!to) return null;
  const isExternal = to.startsWith('http') || to.startsWith('mailto');

  return isExternal ? (
    <a href={to} target='_blank' rel='noopener noreferrer' style={{ color: 'black', display: 'block' }}>
      {children}
    </a>
  ) : (
    <Link to={to} style={{ color: 'black', display: 'block' }}>
      {children}
    </Link>
  );
}
