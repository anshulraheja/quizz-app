import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    category: "tvshows",
    categoryName: "TV Shows",
    description: "Quizzes based on TV shows",
    img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bestblack-tv-1617745112.png?crop=1.00xw:1.00xh;0,0&resize=980:*"
  },
  {
    _id: uuid(),
    category: "movies",
    categoryName: "Movies",
    description: "Quizzes based on Movies",
    img: "https://nofilmschool.com/sites/default/files/styles/article_wide/public/movies_1.jpg?itok=sq9Irp_k"
  },
  {
    _id: uuid(),
    category: "sports",
    categoryName: "Sports",
    description: "Quizzes based on Sports",
    img: "https://wheefootball.files.wordpress.com/2015/12/all-sports-banner.png?w=2000&h="
  },
  {
    _id: uuid(),
    category: "tech",
    categoryName: "Tech",
    description: "Quizzes based on Tech",
    img: "https://digitallearning.eletsonline.com/wp-content/uploads/2020/12/Ed-tech-Revolution.jpg"
  },
];