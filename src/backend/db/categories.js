import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "HTML",
    description: "Questions based on HTML",
  },
  {
    _id: uuid(),
    categoryName: "CSS",
    description: "Questions based on CSS",
  },
  {
    _id: uuid(),
    categoryName: "Javascript",
    description: "Questions based on Javascript",
  },
  {
    _id: uuid(),
    categoryName: "React",
    description: "Questions based on React",
  },
];
