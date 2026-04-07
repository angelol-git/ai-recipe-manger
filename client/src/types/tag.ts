export type Tag = {
  id: string | number;
  name: string;
  color: string;
};

export type EditableTagUpdate = {
  id: string | number;
  name?: string;
  color?: string;
};

export type DraftTag = {
  name: string;
  color: string;
};

export type EditableTag = {
  id: string | number;
  name: string;
  color: string;
};
