import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser } from '@/lib/auth';

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
  onAuthClick: () => void;
  onConsoleClick: () => void;
}

export default function ForumHeader({ 
  activeView, 
  setActiveView, 
  newPostOpen, 
  setNewPostOpen,
  categories,
  onAuthClick,
  onConsoleClick
}: ForumHeaderProps) {
  const user = getCurrentUser();

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
            <Button
              variant="ghost"
              onClick={onConsoleClick}
              className="gap-2"
            >
              <Icon name="Terminal" size={18} />
              Консоль
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            {user && (
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
            )}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer hover-glow">
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="gradient-purple text-white">
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-semibold">{user.username}</div>
                      <Badge variant="secondary" className="text-xs">{user.rank}</Badge>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setActiveView('profile')}>
                    <Icon name="User" size={16} className="mr-2" />
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onConsoleClick}>
                    <Icon name="Terminal" size={16} className="mr-2" />
                    Консоль
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}>
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onAuthClick} className="gradient-purple hover-glow">
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}