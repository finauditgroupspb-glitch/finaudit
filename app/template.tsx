/**
 * Шаблон App Router: перемонтируется при каждой навигации,
 * давая мягкий премиальный переход между страницами
 * (появление с лёгким подъёмом и расфокусом).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
