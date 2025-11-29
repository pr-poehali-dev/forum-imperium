import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  posts: number;
  color: string;
}

interface ForumHeaderProps {
  activeView: 'main' | 'profile' | 'search' | 'complaints';
  setActiveView: (view: 'main' | 'profile' | 'search' | 'complaints') => void;
  newPostOpen: boolean;
  setNewPostOpen: (open: boolean) => void;
  categories: Category[];
}

export default function ForumHeader({ 
  activeView, 
  setActiveView, 
  newPostOpen, 
  setNewPostOpen,
  categories 
}: ForumHeaderProps) {
  return (
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
  );
}
