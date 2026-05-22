export type SelectedItem = {
  id: number;
  name: string;
  status: string;
  species: string;
  url: string;
};

export type SelectedCardState = {
  selectedItems: SelectedItem[];
};
