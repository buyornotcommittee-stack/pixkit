'use client';

export default function ToolLayout({ title, description, children }) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-text-primary mb-2">{title}</h1>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
}
