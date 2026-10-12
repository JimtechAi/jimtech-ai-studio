type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  level?: 1 | 2;
};

export default function SectionHeading({ eyebrow, title, description, light = false, level = 2 }: SectionHeadingProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <div className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}
