import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import { about, columns, copyright, policies } from "@/utils/constants";

interface FooterProps {
  className?: string;
}

const FooterBar = ({
  className,
}: FooterProps) => {

  return (
    <footer className={cn("bg-background w-full", className)}>
      <div className="max-w-7xl mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <h4 className="text-[var(--mainColor)] text-2xl font-bold italic hover:bg-[var(--mainColor)] hover:text-white px-2 rounded-lg cursor-pointer">Slotflow</h4>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <p className="text-[var(--textOne)] text-sm pt-1 px-2 text-end">{about}</p>
              </div>
            </FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div>{"© "}{new Date().getFullYear()}{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}

export default FooterBar;