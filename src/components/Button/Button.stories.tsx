// components/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-native";

import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Continue",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading",
  },
};

export const FullWidth: Story = {
  args: {
    full: true,
    children: "Full width",
  },
};
