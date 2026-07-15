import { memo, useRef } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

import {
  ActionSheet,
  Avatar,
  BottomSheet,
  IconButton,
  type SheetAction,
  Text,
} from "@shared/components";
import { backgroundImage } from "@shared/assets/images";
import {
  MoreVerticalIcon,
  PenIcon,
  ShareIcon,
  TrashBin,
} from "@/shared/assets/icons";
import { styles } from "./ItineraryCard.styles";

export type ItineraryMember = {
  id: string | number;
  name: string;
  avatar?: string;
};

export type ItineraryCardProps = {
  title: string;
  location: string;
  dateLabel: string;
  members?: ItineraryMember[];
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const MAX_VISIBLE_AVATARS = 3;

function buildMembersLabel(members: ItineraryMember[], t: TFunction): string {
  if (members.length === 0) {
    return "";
  }

  const [first, second] = members;

  if (members.length === 1) {
    return first.name;
  }

  if (members.length === 2) {
    return `${first.name}, ${second.name}`;
  }

  return t("home.membersLabel", {
    first: first.name,
    second: second.name,
    count: members.length - 2,
  });
}

function ItineraryCardComponent({
  title,
  location,
  dateLabel,
  members = [],
  onShare,
  onEdit,
  onDelete,
}: ItineraryCardProps) {
  const { t } = useTranslation();
  const sheetRef = useRef<BottomSheet>(null);
  const visibleMembers = members.slice(0, MAX_VISIBLE_AVATARS);

  const actions: SheetAction[] = [
    {
      id: "edit",
      label: t("home.edit"),
      description: t("home.actionSheet.editDesc"),
      Icon: PenIcon,
      onPress: onEdit,
    },
    {
      id: "share",
      label: t("home.shareTrip"),
      description: t("home.actionSheet.shareDesc"),
      Icon: ShareIcon,
      onPress: onShare,
    },
    {
      id: "delete",
      label: t("home.deleteTrip"),
      description: t("home.actionSheet.deleteDesc"),
      Icon: TrashBin,
      onPress: onDelete,
      destructive: true,
    },
  ];

  return (
    <>
      <View style={styles.card}>
        <Image
          source={backgroundImage}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        <View style={styles.scrim} />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text variant="caption" color="white" style={styles.meta}>
              {`${location} · ${dateLabel}`}
            </Text>
            <IconButton
              hitSlop={8}
              style={styles.moreButton}
              onPress={() => sheetRef.current?.present()}
              icon={<MoreVerticalIcon width={20} height={20} color="#FFFFFF" />}
            />
          </View>

          <Text
            variant="h3"
            color="white"
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>

          {members.length > 0 && (
            <View style={styles.membersRow}>
              <View style={styles.avatars}>
                {visibleMembers.map((member, index) => (
                  <View
                    key={member.id}
                    style={[
                      styles.avatarWrap,
                      index > 0 && styles.avatarOverlap,
                    ]}
                  >
                    <Avatar
                      uri={member.avatar}
                      fallback={member.name}
                      size="sm"
                    />
                  </View>
                ))}
              </View>
              <Text
                variant="bodyMedium"
                color="white"
                numberOfLines={1}
                style={styles.membersLabel}
              >
                {buildMembersLabel(members, t)}
              </Text>
            </View>
          )}
        </View>
      </View>

      <ActionSheet
        ref={sheetRef}
        actions={actions}
        header={<Text variant="h4">{title}</Text>}
        onSelect={() => sheetRef.current?.close()}
      />
    </>
  );
}

export const ItineraryCard = memo(ItineraryCardComponent);
