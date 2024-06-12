"use client"
import styles from './page.module.css'
interface IRow{
  children: Array<React.ReactNode> | React.ReactNode,
  gutter?: number;
}
export const Row: React.FC<IRow> = ({ children, gutter }) => {
 
  return <div className={styles.row}>{children}</div>;
};

interface ColProps {
  children: React.ReactNode;
  md?: number;
  span?: number;
  lg?: number;
  className?: string;
}

export const Col = ({ children, span, md, lg, className }: ColProps) => {
  const colClass = [
    styles.col,
    span && styles[`span-${span}`],
    md && styles[`md-${md}`],
    lg && styles[`lg-${lg}`],
    className,
  ].filter(Boolean).join(' ');

  return <div className={colClass}>{children}</div>;
};