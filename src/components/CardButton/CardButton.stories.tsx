// CardButton.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { FaExclamation, FaNapster, FaVuejs } from "react-icons/fa6";
import { View } from "react-native";

import CardButton from "./CardButton";

const meta = {
  title: "Components/CardButton",
  component: CardButton,
  args: {
    title: "Vue.js",
    color: "#10B981",
  },
} satisfies Meta<typeof CardButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Blue: Story = {
  args: {
    title: "Napster",
    color: "#3B82F6",
  },
};

export const Red: Story = {
  args: {
    title: "Uh Oh",
    color: "#f50b0b",
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled",
    color: "#3B82F6",
    disabled: true,
  },
};

export const WithEmojiIcon: Story = {
  args: {
    title: "Vue.js",
    color: "#10B981",
    icon: <FaVuejs />,
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
      <CardButton title="Vue.js" color="#10B981" icon={<FaVuejs />} />
      <CardButton title="Napster" color="#3B82F6" icon={<FaNapster />} />
      <CardButton title="Uh Oh" color="#f50b0b" icon={<FaExclamation />} />
    </View>
  ),
};
