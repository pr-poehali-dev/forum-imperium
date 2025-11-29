import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import ForumHeader from '@/components/forum/ForumHeader';
import MainView from '@/components/forum/MainView';
import ProfileView from '@/components/forum/ProfileView';
import SearchComplaintsView from '@/components/forum/SearchComplaintsView';
import AuthModal from '@/components/forum/AuthModal';
import Windows11Console from '@/components/forum/Windows11Console';
import { getCurrentUser } from '@/lib/auth';

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
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [, setUserUpdate] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      setAuthModalOpen(true);
    }
  }, []);

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
      <ForumHeader 
        activeView={activeView}
        setActiveView={setActiveView}
        newPostOpen={newPostOpen}
        setNewPostOpen={setNewPostOpen}
        categories={categories}
        onAuthClick={() => setAuthModalOpen(true)}
        onConsoleClick={() => setConsoleOpen(true)}
      />

      <AuthModal 
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={() => setUserUpdate(prev => prev + 1)}
      />

      <Windows11Console
        open={consoleOpen}
        onOpenChange={setConsoleOpen}
      />

      <main className="container mx-auto px-4 py-8">
        {activeView === 'main' && (
          <MainView 
            categories={categories}
            posts={posts}
            topUsers={topUsers}
          />
        )}

        {activeView === 'profile' && <ProfileView posts={posts} />}

        {(activeView === 'search' || activeView === 'complaints') && (
          <SearchComplaintsView 
            activeView={activeView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredPosts={filteredPosts}
            complaints={complaints}
            newComplaintOpen={newComplaintOpen}
            setNewComplaintOpen={setNewComplaintOpen}
          />
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