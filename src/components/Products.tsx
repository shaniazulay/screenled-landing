import { asset, Card, Glow, LightChip, LimeButton, PixelCluster, SectionTag, Sparkle } from "./ui";

const PRODUCTS = [
  { name: "קבינט LED פנים P2.5", spec: "פנים · 800 nits · 500×500 מ״מ", price: "₪1,890", img: "product-p25.png", cart: true, best: true },
  { name: "מסך LED חוץ P4", spec: "חוץ · IP65 · 6,500 nits", price: "₪3,450", img: "product-p4.png", cart: false },
  { name: "עמוד פרסום LED Poster", spec: "פנים · P2.5 · נייד על גלגלים", price: "₪8,900", img: "product-poster.png", cart: true },
  { name: "מסך LED שקוף", spec: "שקיפות 70% · P3.9 · לחלונות ראווה", price: "₪5,200", img: "product-transparent.png", cart: false },
];

function ProductCard({ p }: { p: (typeof PRODUCTS)[number] }) {
  return (
    <article className="relative flex h-[520px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_14px_40px_rgba(27,33,64,0.08)] xl:h-[560px]">
      <img loading="lazy" src={asset(p.img)} alt={p.name} className="h-[270px] w-full shrink-0 object-cover" />
      {p.best && (
        <span className="absolute right-[14px] top-[14px] flex items-center gap-[6px] rounded-full bg-lime px-[10px] py-[4px]">
          <span className="font-heebo text-[12px] font-medium leading-[18px] text-ink">הנמכר ביותר</span>
          <img loading="lazy" src={asset("star-dark.svg")} alt="" className="size-[10px]" />
        </span>
      )}
      <div className="flex flex-1 flex-col items-start gap-[8px] p-[22px]">
        <h3 className="font-heebo text-[20px] font-bold leading-[28px] text-navy">{p.name}</h3>
        <p className="font-heebo text-[14px] leading-[21px] text-slate-body">{p.spec}</p>
        <div className="flex-1" />
        <div className="flex items-baseline gap-[8px]">
          <span className="font-heebo text-[14px] font-medium text-slate-body">החל מ-</span>
          <span className="font-heebo text-[28px] font-bold leading-[41px] text-indigo">{p.price}</span>
        </div>
        {p.cart ? (
          <button className="flex h-[50px] w-full items-center justify-center gap-[8px] rounded-full bg-lime px-[24px] transition-[filter] hover:brightness-105">
            <span className="font-heebo text-[16px] font-bold leading-[24px] text-ink">להוספה לסל</span>
            <img loading="lazy" src={asset("icon-cart.svg")} alt="" className="size-[18px]" />
          </button>
        ) : (
          <a
            href="#contact"
            className="flex h-[50px] w-full items-center justify-center rounded-full border-[1.5px] border-indigo px-[24px] font-heebo text-[16px] font-bold leading-[24px] text-indigo transition-colors hover:bg-indigo hover:text-white"
          >
            להצעת מחיר
          </a>
        )}
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <Card id="products" className="px-[20px] pb-[28px] pt-[40px] sm:px-[40px] xl:px-[89px] xl:pb-[96px] xl:pt-[120px]">
      <Glow src="glow-products.svg" box={{ left: 246, top: 410, width: 900, height: 300 }} inset="-53.33% -17.78%" className="hidden xl:block" />
      <PixelCluster color="indigo" style={{ left: 30, top: 30 }} className="hidden xl:block" />
      <Sparkle src="sparkle-16a.svg" size={16} style={{ left: 817, top: 173.4 }} className="hidden xl:block" />
      <Sparkle src="sparkle-8a.svg" size={8} style={{ left: 837, top: 161.4 }} className="hidden xl:block" />

      <div className="relative flex flex-col gap-[24px] xl:h-[200px] xl:flex-row xl:items-start xl:justify-between xl:gap-0">
        <div className="flex flex-col items-start gap-[14px] xl:-mr-[2px]">
          <SectionTag label="מוצרים מובילים" num="02" />
          <h2 className="font-rubik text-[34px] font-semibold leading-[42px] text-navy xl:text-[46px] xl:leading-[58px]">
            הנבחרים <span className="text-indigo">מהקטלוג שלנו</span>
          </h2>
          <div className="flex flex-wrap gap-[8px] xl:mr-[7px] xl:mt-[29px]">
            <LightChip icon="icon-check-chip.svg">התקנה מקצועית</LightChip>
            <LightChip icon="icon-check-chip.svg">משלוח או איסוף</LightChip>
            <LightChip icon="icon-check-chip.svg">תשלומים נוחים</LightChip>
          </div>
        </div>
        <LimeButton label="לכל הקטלוג" arrow="arrow-dark-32.svg" arrowSize={32} textClass="text-[16px]" href="#products" className="h-[54px] w-[200px] xl:mt-[58px]" />
      </div>

      <div className="relative mt-[28px] grid gap-[22px] sm:grid-cols-2 xl:mt-0 xl:grid-cols-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.name} p={p} />
        ))}
      </div>
    </Card>
  );
}
