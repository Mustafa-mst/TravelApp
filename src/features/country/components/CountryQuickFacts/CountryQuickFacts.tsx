import { Fragment, memo } from "react";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import { Card, Divider } from "@shared/components";
import { useStyles } from "@shared/hooks";
import { CountryQuickFact } from "./CountryQuickFact";
import {
  DIVIDER_MARGIN,
  countryQuickFactsStyles,
} from "./CountryQuickFacts.styles";

export type CountryQuickFactItem = {
  key: string;
  Icon: ComponentType<SvgProps>;
  label: string;
  value: string;
};

type CountryQuickFactsProps = {
  facts: CountryQuickFactItem[];
};

function CountryQuickFactsComponent({ facts }: CountryQuickFactsProps) {
  const styles = useStyles(countryQuickFactsStyles);

  if (facts.length === 0) {
    return null;
  }

  return (
    <Card shadow="surface" radius="lg" style={styles.panel}>
      {facts.map(({ key, ...fact }, index) => (
        <Fragment key={key}>
          {index > 0 ? (
            <Divider
              orientation="vertical"
              margin={DIVIDER_MARGIN}
              style={styles.divider}
            />
          ) : null}
          <CountryQuickFact {...fact} />
        </Fragment>
      ))}
    </Card>
  );
}

export const CountryQuickFacts = memo(CountryQuickFactsComponent);
