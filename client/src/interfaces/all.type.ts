export type Ianimal = {
  _id: string;
  name: string;
  type: string;
  color: string;
  legs: number;
  description: string;
  category?: string;
  createdAt: Date;
};

export type Icar = {
  _id: string;
  name: string;
  engineType: string;
  transmissionType: string;
  brand: string;
  color: string;
  category?: string;
  createdAt: Date;
};

export type Itelephone = {
  _id: string;
  name: string;
  brand: string;
  displayType: string;
  storageSize: number;
  ramSize: number;
  color: string;
  category?: string;
  createdAt: Date;
};

export type Ibook = {
  _id: string;
  title: string;
  author: string;
  pages: number;
  genre: string;
  year: number;
  category?: string;
  createdAt: Date;
};

export type IanimalArr = {
  count: number;
  animals: Ianimal[];
};

export type IcarArr = {
  count: number;
  cars: Icar[];
};

export type ItelephoneArr = {
  count: number;
  telephones: Itelephone[];
};

export type IbookArr = {
  count: number;
  books: Ibook[];
};

export type IallSorted = {
  count: number;
  all: [Ianimal | Icar | Itelephone | Ibook];
};

export type IallCategories = {
  count: number;
  animals?: IanimalArr;
  cars?: IcarArr;
  telephones?: ItelephoneArr;
  books?: IbookArr;
};
