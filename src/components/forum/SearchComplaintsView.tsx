import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

interface Complaint {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  author: string;
  timestamp: string;
}

interface SearchComplaintsViewProps {
  activeView: 'search' | 'complaints';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPosts: Post[];
  complaints: Complaint[];
  newComplaintOpen: boolean;
  setNewComplaintOpen: (open: boolean) => void;
}

export default function SearchComplaintsView({ 
  activeView,
  searchQuery, 
  setSearchQuery, 
  filteredPosts,
  complaints,
  newComplaintOpen,
  setNewComplaintOpen
}: SearchComplaintsViewProps) {
  if (activeView === 'search') {
    return (
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
    );
  }

  return (
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
  );
}
