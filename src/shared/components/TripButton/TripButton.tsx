import { memo } from "react";

import { useStyles } from "@shared/hooks";
import { Button } from "../Button";
import { tripButtonStyles } from "./TripButton.styles";

export type TripButtonProps = {
  label: string;
  onPress?: () => void;
};

function TripButtonComponent({ label, onPress }: TripButtonProps) {
  const styles = useStyles(tripButtonStyles);

  return (
    <Button
      label={label}
      variant="primary"
      size="md"
      labelVariant="bodyLargeSemiBold"
      fullWidth
      style={styles.button}
      pressedStyle={styles.buttonPressed}
      onPress={onPress}
    />
  );
}

export const TripButton = memo(TripButtonComponent);
