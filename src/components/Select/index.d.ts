export interface SeletOptionProps {
  id: string;
  name: string;
}

export interface SelectProps {
  filterKey: string;
  placeholder?: string;
  options: SeletOptionProps[];
  disabled?: boolean;
  selectedValue?: SeletOptionProps;
  defaultValue?: SeletOptionProps;
  onSelectChanged?: any;
}