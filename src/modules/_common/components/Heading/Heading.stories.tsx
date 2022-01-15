import { Heading } from ".";
import { ComponentStory, Meta } from "@storybook/react";

export default {
  title: "components/Heading",
  component: Heading,
} as Meta;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "This is a heading",
};
