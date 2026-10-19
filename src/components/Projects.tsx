import { asset, Card, GlassChip, LimeButton, PixelCluster, SectionTag, Sparkle } from "./ui";

// Positions are % of the 1440px-wide curved wall (matches the Figma layout exactly at 1440).
const PANELS = [
  { img: "project-1.png", left: 0, width: 9.861 },
  { img: "project-2.png", left: 10.764, width: 25.556, caption: "קיר וידאו · אטריום קניון" },
  { img: "project-3.png", left: 37.222, width: 25.556, caption: "מסך פינתי 3D · חזית מסחרית" },
  { img: "project-4.png", left: 63.681, width: 25.556, caption: "מסכים מודולריים · במת הופעה" },
  { img: "project-5.png", left: 90.139, width: 9.861 },
];

const wallMask = {
  WebkitMaskImage: `url(${asset("wall-mask.svg")})`,
  maskImage: `url(${asset("wall-mask.svg")})`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
} as const;

export default function Projects() {
  return (
    <Card id="projects" dark className="pb-[32px] pt-[48px] xl:pb-[49px] xl:pt-[111.2px]">
      <PixelCluster color="lime" mirror style={{ right: 30, top: 30 }} className="hidden xl:block" />
      <Sparkle src="sparkle-16b.svg" size={16} style={{ left: 357, top: 154 }} className="hidden xl:block" />
      <Sparkle src="sparkle-8b.svg" size={8} style={{ left: 377, top: 142 }} className="hidden xl:block" />

      <div className="flex flex-col items-center px-[20px] text-center">
        <SectionTag label="פרויקטים מהשטח" num="03" dark className="xl:-translate-x-[32.3px]" />
        <h2 className="mt-[20px] font-rubik text-[34px] font-semibold leading-[42px] tracking-[-0.54px] text-white xl:mt-[21.8px] xl:text-[54px] xl:leading-[64px]">
          <span className="block">לא תמונות מקטלוג.</span>
          <span className="block text-lime">פרויקטים אמיתיים שהתקנו.</span>
        </h2>
        <LimeButton label="לכל הפרויקטים" href="#projects" className="mt-[24px] h-[58px] w-[230px] xl:mt-[30px]" />
      </div>

      {/* Curved video wall (scrollable on small screens) */}
      <div className="mt-[40px] overflow-x-auto xl:mt-[60px] xl:overflow-visible [scrollbar-width:none]">
        <div className="relative aspect-[1440/634] min-w-[880px] xl:-mx-[24px] xl:aspect-auto xl:h-[634px] xl:min-w-0">
          <img loading="lazy" src={asset("wall-rim.svg")} alt="" className="absolute inset-0 size-full" />
          <div className="absolute inset-x-0 top-[3.47%] h-[93.06%] bg-night" style={wallMask}>
            {PANELS.map((p) => (
              <div key={p.img} className="absolute inset-y-0" style={{ left: `${p.left}%`, width: `${p.width}%` }}>
                <img loading="lazy" src={asset(p.img)} alt={p.caption ?? ""} className="absolute inset-0 size-full object-cover" />
                {p.caption && (
                  <span className="absolute right-[16px] top-[73.39%] whitespace-nowrap rounded-[4px] bg-[rgba(21,21,25,0.7)] px-[12px] py-[6px] font-heebo text-[13px] font-medium leading-[19px] text-white">
                    {p.caption}
                  </span>
                )}
              </div>
            ))}
            <span
              className="absolute inset-0"
              style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 82%, rgba(0,0,0,0.55) 100%)" }}
            />
          </div>
        </div>
      </div>

      <div className="relative mt-[20px] flex h-[29px] items-center justify-center px-[20px] xl:px-[89px]">
        <span className="absolute left-[20px] top-[6px] font-mont text-[13px] font-medium leading-[16px] tracking-[1.3px] text-white/60 xl:left-[89px]" dir="ltr">
          01 / 05
        </span>
        <GlassChip icon="icon-drag.svg">גררו לצפייה</GlassChip>
        <span className="absolute right-[20px] top-[14px] hidden h-[2px] w-[160px] rounded-[1px] bg-white/15 sm:block xl:right-[89px]">
          <span className="absolute right-0 top-0 h-[2px] w-[40px] rounded-[1px] bg-lime" />
        </span>
      </div>
    </Card>
  );
}
