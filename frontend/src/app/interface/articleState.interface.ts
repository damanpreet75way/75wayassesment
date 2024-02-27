import { ArticleInterface } from "./article.interface";

export interface ArticleStateInterface {
    isLoading: boolean;
    articles: ArticleInterface[];
    error: string | null;
}