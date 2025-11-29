import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

interface MainViewProps {
  categories: Category[];
  posts: Post[];
  topUsers: User[];
}

export default function MainView({ categories, posts, topUsers }: MainViewProps) {
  return (
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
  );
}
