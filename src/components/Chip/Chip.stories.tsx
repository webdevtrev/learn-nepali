// Chip.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Alert, View } from "react-native";

import Chip from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  args: {
    children: "New",
    variant: "new",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["new", "inProgress", "completed", "review", "default"],
    },
    removable: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const New: Story = {};

export const InProgress: Story = {
  args: {
    children: "In Progress",
    variant: "inProgress",
  },
};

export const Completed: Story = {
  args: {
    children: "Completed",
    variant: "completed",
  },
};

export const Review: Story = {
  args: {
    children: "Review",
    variant: "review",
  },
};

export const Default: Story = {
  args: {
    children: "Default",
    variant: "default",
  },
};

export const Removable: Story = {
  args: {
    children: "Removable",
    variant: "new",
    removable: true,
    onRemove: () => Alert.alert("Removed"),
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Chip variant="new">New</Chip>
      <Chip variant="inProgress">In Progress</Chip>
      <Chip variant="completed">Completed</Chip>
      <Chip variant="review">Review</Chip>
      <Chip variant="default">Default</Chip>
      <Chip variant="new" removable onRemove={() => Alert.alert("Removed")}>
        Removable
      </Chip>
    </View>
  ),
};
