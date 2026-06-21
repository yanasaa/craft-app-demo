export const mockUser = {
    id: 1,
    username: "demo_user",
    first_name: "Иван",
    last_name: "Иванов",
    email: "demo@test.com",
    avatar: null,
  };
  
  export const mockCategories = [
    {
      id: 1,
      title: "Технологии",
    },
    {
      id: 2,
      title: "Бизнес",
    },
    {
      id: 3,
      title: "Новости",
    },
  ];
  
  export const mockArticles = [
    {
      id: 1,
      title: "Первая статья",
      description: "Тестовая статья для демонстрации",
      likes_count: 15,
      is_liked: true,
      category: 1,
    },
    {
      id: 2,
      title: "Вторая статья",
      description: "Еще одна статья",
      likes_count: 7,
      is_liked: false,
      category: 2,
    },
  ];