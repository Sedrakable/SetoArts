import styles from "./LangSwitcher.module.scss";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import FlexDiv from "@/components/reuse/FlexDiv";
import { Icon } from "@/components/reuse/Icon";
import { Paragraph } from "@/components/reuse/Paragraph";

export const LangSwitcher: React.FC<{ onClick?: Function }> = ({ onClick }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  const langClick = () => {
    const newLang = locale === "en" ? "fr" : "en";
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLang }
      );
    });
    onClick && onClick();
  };

  return (
    <FlexDiv gapArray={[2]} className={styles.langWrapper} onClick={langClick}>
      <Paragraph level="big" color="yellow">
        {locale?.toUpperCase()}
      </Paragraph>
      <Icon icon="internet" size="regular" />
    </FlexDiv>
  );
};
