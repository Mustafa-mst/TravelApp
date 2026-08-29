import { memo } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Text } from "../Text";
import { ERROR_ENTER_MS, ERROR_EXIT_MS } from "./textField.constants";

type TextFieldErrorProps = {
  message: string;
  animated: boolean;
};

function TextFieldErrorComponent({ message, animated }: TextFieldErrorProps) {
  return (
    <Animated.View
      entering={animated ? FadeIn.duration(ERROR_ENTER_MS) : undefined}
      exiting={animated ? FadeOut.duration(ERROR_EXIT_MS) : undefined}
    >
      <Text variant="body" color="danger">
        {message}
      </Text>
    </Animated.View>
  );
}

export const TextFieldError = memo(TextFieldErrorComponent);
