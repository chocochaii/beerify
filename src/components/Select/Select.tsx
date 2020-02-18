import React from "react";
import { Select } from "antd";
import { SelectProps, SeletOptionProps } from "./index.d";

const { Option } = Select;

export const AppSelect: React.FC<SelectProps> = props => {
  let {
    filterKey = "",
    placeholder = "Please select",
    options = [],
    disabled = false,
    selectedValue = null,
    defaultValue = { id: "", name: "Select all" },
    onSelectChanged = () => {}
  } = props;

  if (defaultValue) {
    if (options.findIndex(option => option.id === defaultValue.id) === -1) {
      options.unshift(defaultValue);
    }
  }

  if (!selectedValue) {
    selectedValue = defaultValue;
  }

  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={(value: string) => {
        onSelectChanged(value, filterKey);
      }}
      filterOption={(input: string, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      disabled={disabled}
      defaultValue={selectedValue ? selectedValue.id : undefined}
    >
      {options.map((option: SeletOptionProps) => (
        <Option key={option.id} value={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};
