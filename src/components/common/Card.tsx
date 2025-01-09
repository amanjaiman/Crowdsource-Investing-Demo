import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "hover" | "interactive";
}

export function Card({
  children,
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  const baseStyles = "bg-white rounded-lg overflow-hidden";
  const variantStyles = {
    default: "shadow-soft",
    hover: "shadow-soft hover:shadow-hover transition-shadow duration-300",
    interactive:
      "shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({
  children,
  className = "",
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={`px-6 py-4 border-b border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({
  children,
  className = "",
  ...props
}: CardContentProps) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({
  children,
  className = "",
  ...props
}: CardFooterProps) {
  return (
    <div
      className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
