import { Input } from ".";
import { ComponentStory, Meta } from "@storybook/react";

export default {
  title: "components/Input",
  component: Input,
} as Meta;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "default",
  name: "default",
  placeholder: "Some Placeholder",
  type: "text",
};
