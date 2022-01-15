import { Button } from ".";
import { ComponentStory, Meta } from "@storybook/react";

export default {
  title: "components/Button",
  component: Button,
} as Meta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Click me",
};
