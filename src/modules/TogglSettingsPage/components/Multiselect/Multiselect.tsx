import React, { useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";

const items = [
  "Neptunium",
  "Plutonium",
  "Americium",
  "Curium",
  "Berkelium",
  "Californium",
  "Einsteinium",
  "Fermium",
  "Mendelevium",
];

export function Multiselect() {
  const [inputValue, setInputValue] = useState<string | undefined>("");

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: [items[0], items[1]] });

  const getFilteredItems = (items: any) =>
    items.filter(
      (item: any) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue!.toLowerCase())
    );
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    items: getFilteredItems(items),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue("");
            addSelectedItem(selectedItem as string);
            selectItem(null);
          }

          break;
        default:
          break;
      }
    },
  });
  return (
    <div className="relative">
      <div>
        <div {...getComboboxProps()}>
          <input
            type="text"
            className="block p-4 w-full bg-transparent border-x-0 border-t-0 border-b-2 border-b-black focus:border-b-black focus:ring-0"
            placeholder="Type to select tags..."
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
        </div>
        <div className="flex flex-wrap justify-center mt-4">
          {selectedItems.map((selectedItem, index) => (
            <span
              key={`selected-item-${index}`}
              {...getSelectedItemProps({ selectedItem, index })}
              className="py-2 px-4 m-1 text-xs bg-gray-200 hover:bg-gray-250 rounded-full hover:cursor-pointer"
              onClick={() => removeSelectedItem(selectedItem)}
            >
              {selectedItem}
              <span className="ml-2">&#10005;</span>
            </span>
          ))}
        </div>
      </div>
      <ul
        className="overflow-auto absolute empty:py-0 w-full max-h-24 bg-gray-100 rounded-md shadow-md"
        {...getMenuProps()}
      >
        {isOpen &&
          getFilteredItems(items).map((item: any, index: any) => (
            <li
              className="p-2"
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}
