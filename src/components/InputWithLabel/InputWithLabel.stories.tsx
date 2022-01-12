import { InputWithLabel } from ".";
import { ComponentStory, Meta } from "@storybook/react";

export default {
  title: "components/InputWithLabel",
  component: InputWithLabel,
} as Meta;

const Template: ComponentStory<typeof InputWithLabel> = (args) => (
  <InputWithLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "default",
  name: "default",
  placeholder: "Some Placeholder",
  type: "text",
};
