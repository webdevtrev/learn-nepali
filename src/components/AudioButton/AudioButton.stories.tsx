import type { Meta, StoryObj } from "@storybook/react-native";

import AudioButton from "./AudioButton";

const testFile =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

const meta = {
  title: "Components/AudioButton",
  component: AudioButton,
  args: {
    src: testFile,
    variant: "primary",
    size: "medium",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "speaker"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof AudioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Speaker: Story = {
  args: {
    variant: "speaker",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
