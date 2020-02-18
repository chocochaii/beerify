export interface BreadcrumbItemProps {
  path: string;
  name: string;
}
export interface BreadcrumbKeysProps {
  style?: string;
  country?: string;
  title?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
  keys: BreadcrumbKeysProps;
}
