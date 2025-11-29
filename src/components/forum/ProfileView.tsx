import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface ProfileViewProps {
  posts: Post[];
}

export default function ProfileView({ posts }: ProfileViewProps) {
  return (
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
  );
}
