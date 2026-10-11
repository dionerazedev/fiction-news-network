import Link from "next/link";
import type { Category } from "@/lib/site";

/** Category marker, coloured by the category's route ink. */
export function RouteStamp({ category, link = true }: { category: Category; link?: boolean }) {
  const inner = <span className="route-stamp__name">{category.name}</span>;
  return link ? (
    <Link href={`/category/${category.slug}`} className="route-stamp" data-route={category.slug}>
      {inner}
    </Link>
  ) : (
    <span className="route-stamp" data-route={category.slug}>
      {inner}
    </span>
  );
}
