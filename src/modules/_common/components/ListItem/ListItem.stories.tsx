import { Meta, ComponentStory } from "@storybook/react";
import { ListItem } from ".";

export default {
  title: "components/ListItem",
  component: ListItem,
} as Meta;

const Template: ComponentStory<typeof ListItem> = (args) => (
  <ListItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "1",
  text: "Task 1",
};
