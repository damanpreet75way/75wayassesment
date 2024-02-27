export interface ArticleInterface {
    author: {
        username: string;
        bio: string | null;
        image: string;
        following: boolean;
    };
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
    
}