import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getCurrentUser, getNextRank, getRankProgress, RANKS } from '@/lib/auth';

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
  const user = getCurrentUser();
  const nextRank = user ? getNextRank(user.rating) : null;
  const progress = user ? getRankProgress(user.rating) : 0;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <Icon name="UserX" size={64} className="mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">Войдите для просмотра профиля</h2>
        <p className="text-muted-foreground">Создайте аккаунт или войдите, чтобы увидеть статистику</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader className="relative pb-20">
          <div className="absolute inset-0 gradient-purple rounded-t-xl h-32" />
          <div className="relative flex items-end gap-6">
            <Avatar className="w-32 h-32 border-4 border-card">
              <AvatarFallback className="gradient-blue-purple text-white text-4xl">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="pb-4 flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold">{user.username}</h2>
                <Badge className="gradient-purple">{user.rank}</Badge>
              </div>
              <p className="text-muted-foreground">Участник с {new Date(user.joinDate).toLocaleDateString('ru-RU')}</p>
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
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Прогресс ранга</CardTitle>
                  <CardDescription>
                    {nextRank ? 
                      `До следующего ранга "${nextRank.name}" осталось ${nextRank.minRating - user.rating} рейтинга` :
                      'Вы достигли максимального ранга!'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-3" />
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-center">
                      <div className="text-3xl mb-1">{RANKS.find(r => r.name === user.rank)?.icon}</div>
                      <div className="text-sm font-semibold">{user.rank}</div>
                    </div>
                    {nextRank && (
                      <>
                        <Icon name="ArrowRight" size={24} className="text-muted-foreground" />
                        <div className="text-center">
                          <div className="text-3xl mb-1">{nextRank.icon}</div>
                          <div className="text-sm font-semibold">{nextRank.name}</div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold gradient-text">{user.rating}</div>
                    <div className="text-muted-foreground mt-2">Рейтинг</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold gradient-text">{user.posts}</div>
                    <div className="text-muted-foreground mt-2">Постов</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold gradient-text">{user.comments}</div>
                    <div className="text-muted-foreground mt-2">Комментариев</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Все ранги форума</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {RANKS.map((rank) => (
                      <div 
                        key={rank.name}
                        className={`flex items-center gap-4 p-3 rounded-lg ${rank.name === user.rank ? 'bg-primary/10 border-2 border-primary' : 'bg-muted'}`}
                      >
                        <div className="text-3xl">{rank.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold">{rank.name}</div>
                          <div className="text-sm text-muted-foreground">От {rank.minRating} рейтинга</div>
                        </div>
                        {rank.name === user.rank && (
                          <Badge className="gradient-purple">Текущий ранг</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

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
                    <Input placeholder={user.username} className="mt-2" disabled />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder={user.email} className="mt-2" disabled />
                  </div>
                  <div>
                    <Label>О себе</Label>
                    <Textarea placeholder={user.bio || "Расскажите о себе..."} className="mt-2" />
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