import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  rating: number;
  timestamp: string;
  isHot?: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  posts: number;
  color: string;
}

interface User {
  id: number;
  name: string;
  rating: number;
  posts: number;
  badge: string;
}

interface Complaint {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  author: string;
  timestamp: string;
}

const Index = () => {
  const [activeView, setActiveView] = useState<'main' | 'profile' | 'search' | 'complaints'>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newComplaintOpen, setNewComplaintOpen] = useState(false);

  const categories: Category[] = [
    { id: 1, name: 'Общее обсуждение', icon: 'MessageSquare', description: 'Обсуждение любых тем', posts: 1243, color: 'gradient-purple' },
    { id: 2, name: 'Новости', icon: 'Newspaper', description: 'Последние новости форума', posts: 856, color: 'gradient-blue-purple' },
    { id: 3, name: 'Помощь', icon: 'HelpCircle', description: 'Вопросы и ответы', posts: 2341, color: 'bg-accent' },
    { id: 4, name: 'Игры', icon: 'Gamepad2', description: 'Обсуждение игр', posts: 987, color: 'bg-secondary' },
    { id: 5, name: 'Технологии', icon: 'Cpu', description: 'IT и технологии', posts: 654, color: 'gradient-purple' },
    { id: 6, name: 'Развлечения', icon: 'Sparkles', description: 'Музыка, фильмы, мемы', posts: 1523, color: 'gradient-blue-purple' },
  ];

  const posts: Post[] = [
    {
      id: 1,
      title: 'Добро пожаловать в Imperium!',
      content: 'Рады приветствовать вас на нашем форуме. Здесь вы можете обсуждать любые темы...',
      author: 'Admin',
      category: 'Общее обсуждение',
      replies: 234,
      views: 5432,
      rating: 156,
      timestamp: '2 часа назад',
      isHot: true
    },
    {
      id: 2,
      title: 'Обновление правил форума',
      content: 'Внимание! Обновлены правила использования форума...',
      author: 'Moderator',
      category: 'Новости',
      replies: 89,
      views: 2341,
      rating: 92,
      timestamp: '5 часов назад',
      isHot: true
    },
    {
      id: 3,
      title: 'Как получить больше рейтинга?',
      content: 'Расскажу про систему рейтинга на форуме...',
      author: 'ProUser123',
      category: 'Помощь',
      replies: 45,
      views: 1234,
      rating: 67,
      timestamp: '1 день назад'
    },
    {
      id: 4,
      title: 'Топ-10 игр 2024 года',
      content: 'Мой личный рейтинг лучших игр этого года...',
      author: 'Gamer_Pro',
      category: 'Игры',
      replies: 156,
      views: 4567,
      rating: 234,
      timestamp: '2 дня назад',
      isHot: true
    }
  ];

  const topUsers: User[] = [
    { id: 1, name: 'SuperUser', rating: 9850, posts: 1234, badge: 'Легенда' },
    { id: 2, name: 'ProGamer', rating: 8745, posts: 987, badge: 'Мастер' },
    { id: 3, name: 'TechGuru', rating: 7654, posts: 765, badge: 'Эксперт' },
  ];

  const complaints: Complaint[] = [
    { id: 1, title: 'Спам в топике', description: 'Пользователь спамит в теме "Общее обсуждение"', status: 'pending', author: 'User123', timestamp: '10 мин назад' },
    { id: 2, title: 'Нарушение правил', description: 'Оскорбления в комментариях', status: 'reviewed', author: 'User456', timestamp: '1 час назад' },
  ];

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center">
                <Icon name="Crown" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">IMPERIUM</h1>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <Button 
                variant={activeView === 'main' ? 'default' : 'ghost'}
                onClick={() => setActiveView('main')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button 
                variant={activeView === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveView('profile')}
                className="gap-2"
              >
                <Icon name="User" size={18} />
                Профиль
              </Button>
              <Button 
                variant={activeView === 'search' ? 'default' : 'ghost'}
                onClick={() => setActiveView('search')}
                className="gap-2"
              >
                <Icon name="Search" size={18} />
                Поиск
              </Button>
              <Button 
                variant={activeView === 'complaints' ? 'default' : 'ghost'}
                onClick={() => setActiveView('complaints')}
                className="gap-2"
              >
                <Icon name="Flag" size={18} />
                Жалобы
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-purple hover-glow">
                    <Icon name="PenSquare" size={18} className="mr-2" />
                    Создать пост
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создать новый пост</DialogTitle>
                    <DialogDescription>Поделитесь своими мыслями с сообществом</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Заголовок</Label>
                      <Input placeholder="Введите заголовок..." className="mt-2" />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <select className="w-full mt-2 px-3 py-2 bg-input rounded-lg border border-border">
                        {categories.map(cat => (
                          <option key={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Содержание</Label>
                      <Textarea placeholder="Расскажите подробнее..." className="mt-2 min-h-32" />
                    </div>
                    <Button className="w-full gradient-purple hover-glow">
                      Опубликовать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Avatar className="cursor-pointer hover-glow">
                <AvatarFallback className="gradient-purple text-white">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeView === 'main' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Категории</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {categories.map(category => (
                  <Card key={category.id} className="hover-glow cursor-pointer border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                          <Icon name={category.icon as any} size={24} className="text-white" />
                        </div>
                        <Badge variant="secondary">{category.posts} постов</Badge>
                      </div>
                      <CardTitle className="mt-4">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-6">🔥 Горячие темы</h2>
                <div className="space-y-4">
                  {posts.map(post => (
                    <Card key={post.id} className="hover-glow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Avatar>
                              <AvatarFallback className="gradient-blue-purple text-white">
                                {post.author[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{post.author}</span>
                                <span className="text-muted-foreground text-sm">• {post.timestamp}</span>
                                {post.isHot && <Badge className="gradient-purple">🔥 HOT</Badge>}
                              </div>
                              <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                              <CardDescription>{post.content}</CardDescription>
                              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Icon name="MessageSquare" size={16} />
                                  {post.replies}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Eye" size={16} />
                                  {post.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="TrendingUp" size={16} />
                                  {post.rating}
                                </span>
                                <Badge variant="outline">{post.category}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" size={20} className="text-yellow-500" />
                    Топ пользователей
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topUsers.map((user, index) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-muted-foreground w-8">
                        {index + 1}
                      </div>
                      <Avatar>
                        <AvatarFallback className="gradient-purple text-white">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.rating} рейтинга
                        </div>
                      </div>
                      <Badge className="gradient-purple">{user.badge}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-2 gradient-purple">
                <CardContent className="pt-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Получи значок!</h3>
                  <p className="text-white/90 mb-4">Пиши активные посты и получай уникальные значки</p>
                  <Button className="w-full bg-white text-primary hover:bg-white/90">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader className="relative pb-20">
                <div className="absolute inset-0 gradient-purple rounded-t-xl h-32" />
                <div className="relative flex items-end gap-6">
                  <Avatar className="w-32 h-32 border-4 border-card">
                    <AvatarFallback className="gradient-blue-purple text-white text-4xl">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="pb-4">
                    <h2 className="text-3xl font-bold">CurrentUser</h2>
                    <p className="text-muted-foreground">Участник с января 2024</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="stats">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="stats">Статистика</TabsTrigger>
                    <TabsTrigger value="posts">Посты</TabsTrigger>
                    <TabsTrigger value="settings">Настройки</TabsTrigger>
                  </TabsList>
                  <TabsContent value="stats" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-4xl font-bold gradient-text">1,234</div>
                          <div className="text-muted-foreground mt-2">Рейтинг</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-4xl font-bold gradient-text">87</div>
                          <div className="text-muted-foreground mt-2">Постов</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-4xl font-bold gradient-text">456</div>
                          <div className="text-muted-foreground mt-2">Комментариев</div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Достижения</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 rounded-lg bg-muted">
                            <div className="text-3xl mb-2">🏆</div>
                            <div className="text-sm font-semibold">Первый пост</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted">
                            <div className="text-3xl mb-2">⭐</div>
                            <div className="text-sm font-semibold">100 лайков</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted">
                            <div className="text-3xl mb-2">💬</div>
                            <div className="text-sm font-semibold">Активный</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted">
                            <div className="text-3xl mb-2">🔥</div>
                            <div className="text-sm font-semibold">Популярный</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="posts" className="mt-6">
                    <div className="space-y-4">
                      {posts.slice(0, 2).map(post => (
                        <Card key={post.id} className="hover-glow cursor-pointer">
                          <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>{post.content}</CardDescription>
                            <div className="flex items-center gap-4 mt-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Icon name="MessageSquare" size={16} />
                                {post.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="TrendingUp" size={16} />
                                {post.rating}
                              </span>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Настройки профиля</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Имя пользователя</Label>
                          <Input placeholder="CurrentUser" className="mt-2" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" placeholder="user@example.com" className="mt-2" />
                        </div>
                        <div>
                          <Label>О себе</Label>
                          <Textarea placeholder="Расскажите о себе..." className="mt-2" />
                        </div>
                        <Button className="w-full gradient-purple hover-glow">
                          Сохранить изменения
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'search' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Поиск по форуму</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Поиск постов, пользователей, категорий..." 
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {searchQuery && (
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Найдено результатов: {filteredPosts.length}
                </h3>
                <div className="space-y-4">
                  {filteredPosts.map(post => (
                    <Card key={post.id} className="hover-glow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="gradient-purple text-white text-sm">
                              {post.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{post.author}</span>
                          <span className="text-muted-foreground text-sm">• {post.timestamp}</span>
                        </div>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.content}</CardDescription>
                        <div className="flex items-center gap-4 mt-4 text-sm">
                          <Badge variant="outline">{post.category}</Badge>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Icon name="MessageSquare" size={16} />
                            {post.replies}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === 'complaints' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Жалобы</h2>
              <Dialog open={newComplaintOpen} onOpenChange={setNewComplaintOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-purple hover-glow">
                    <Icon name="Flag" size={18} className="mr-2" />
                    Подать жалобу
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Подать жалобу</DialogTitle>
                    <DialogDescription>Опишите проблему, наша команда рассмотрит её</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Тема жалобы</Label>
                      <Input placeholder="Кратко опишите проблему" className="mt-2" />
                    </div>
                    <div>
                      <Label>Подробное описание</Label>
                      <Textarea placeholder="Подробно опишите ситуацию..." className="mt-2 min-h-32" />
                    </div>
                    <Button className="w-full gradient-purple hover-glow">
                      Отправить жалобу
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {complaints.map(complaint => (
                <Card key={complaint.id} className="hover-glow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{complaint.title}</CardTitle>
                          <Badge 
                            variant={
                              complaint.status === 'pending' ? 'secondary' :
                              complaint.status === 'reviewed' ? 'default' : 'outline'
                            }
                          >
                            {complaint.status === 'pending' ? 'Ожидает' :
                             complaint.status === 'reviewed' ? 'Рассмотрено' : 'Решено'}
                          </Badge>
                        </div>
                        <CardDescription>{complaint.description}</CardDescription>
                        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                          <span>От: {complaint.author}</span>
                          <span>•</span>
                          <span>{complaint.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                <Icon name="Crown" size={16} className="text-white" />
              </div>
              <span className="font-semibold">IMPERIUM © 2024</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Правила</a>
              <a href="#" className="hover:text-foreground transition-colors">О нас</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
              <a href="#" className="hover:text-foreground transition-colors">Помощь</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;