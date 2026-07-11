import { memo } from "react";
import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

import { Avatar, Text } from "@shared/components";
import { styles } from "./ItineraryCard.styles";
import { PenIcon, ShareIcon, UserSearchIcon } from "@/shared/assets/icons";

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
  onInvite?: () => void;
  onEdit?: () => void;
};

const MAX_VISIBLE_AVATARS = 3;

function buildMembersLabel(
  members: ItineraryMember[],
  t: TFunction,
): string {
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
  onInvite,
  onEdit,
}: ItineraryCardProps) {
  const { t } = useTranslation();
  const visibleMembers = members.slice(0, MAX_VISIBLE_AVATARS);

  return (
    <View style={styles.card}>
      <Text variant="caption" color="textTertiary" style={styles.meta}>
        {`${location} · ${dateLabel}`}
      </Text>

      <Text variant="h3" color="text" numberOfLines={1} style={styles.title}>
        {title}
      </Text>

      {members.length > 0 && (
        <View style={styles.membersRow}>
          <View style={styles.avatars}>
            {visibleMembers.map((member, index) => (
              <View
                key={member.id}
                style={[styles.avatarWrap, index > 0 && styles.avatarOverlap]}
              >
                <Avatar uri={member.avatar} fallback={member.name} size="sm" />
              </View>
            ))}
          </View>
          <Text
            variant="bodyMedium"
            color="textTertiary"
            numberOfLines={1}
            style={styles.membersLabel}
          >
            {buildMembersLabel(members, t)}
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          onPress={onShare}
        >
          <ShareIcon width={14} height={14} />
          <Text variant="caption" color="text">
            {t("home.shareTrip")}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          onPress={onInvite}
        >
          <UserSearchIcon width={14} height={14} />
          <Text variant="caption" color="text">
            {t("home.inviteFriends")}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          onPress={onEdit}
        >
          <PenIcon width={12} height={12} />
          <Text variant="caption" color="text">
            {t("home.edit")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const ItineraryCard = memo(ItineraryCardComponent);
