// .storybook/preview.tsx
import type { Preview } from "@storybook/react";
import React from "react";

import { AppThemeProvider } from "../src/providers/theme-provider";
// or: import { AppThemeProvider } from '../providers/theme-provider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppThemeProvider>
        <Story />
      </AppThemeProvider>
    ),
  ],
};

export default preview;
