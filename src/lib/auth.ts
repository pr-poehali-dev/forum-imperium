export interface UserData {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  rating: number;
  posts: number;
  comments: number;
  rank: string;
  joinDate: string;
  bio?: string;
}

export interface RankData {
  name: string;
  minRating: number;
  color: string;
  icon: string;
}

export const RANKS: RankData[] = [
  { name: 'Новичок', minRating: 0, color: 'bg-gray-500', icon: '🌱' },
  { name: 'Участник', minRating: 100, color: 'bg-blue-500', icon: '⭐' },
  { name: 'Активист', minRating: 500, color: 'bg-green-500', icon: '💚' },
  { name: 'Эксперт', minRating: 1500, color: 'bg-purple-500', icon: '💎' },
  { name: 'Мастер', minRating: 5000, color: 'bg-orange-500', icon: '🔥' },
  { name: 'Легенда', minRating: 10000, color: 'bg-red-500', icon: '👑' },
];

export function getRankByRating(rating: number): RankData {
  const rank = [...RANKS].reverse().find(r => rating >= r.minRating);
  return rank || RANKS[0];
}

export function getNextRank(currentRating: number): RankData | null {
  const currentRank = getRankByRating(currentRating);
  const currentIndex = RANKS.indexOf(currentRank);
  return currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
}

export function getRankProgress(rating: number): number {
  const currentRank = getRankByRating(rating);
  const nextRank = getNextRank(rating);
  
  if (!nextRank) return 100;
  
  const progress = ((rating - currentRank.minRating) / (nextRank.minRating - currentRank.minRating)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

const STORAGE_KEY = 'imperium_user';
const USERS_KEY = 'imperium_users';

export function getCurrentUser(): UserData | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function setCurrentUser(user: UserData | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getAllUsers(): UserData[] {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveUser(user: UserData): void {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === user.id);
  
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setCurrentUser(user);
}

export function register(username: string, email: string, password: string): { success: boolean; error?: string; user?: UserData } {
  const users = getAllUsers();
  
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: 'Пользователь с таким именем уже существует' };
  }
  
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'Email уже используется' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Пароль должен быть не менее 6 символов' };
  }
  
  const newUser: UserData = {
    id: Date.now().toString(),
    username,
    email,
    rating: 0,
    posts: 0,
    comments: 0,
    rank: 'Новичок',
    joinDate: new Date().toISOString(),
  };
  
  saveUser(newUser);
  return { success: true, user: newUser };
}

export function login(username: string, password: string): { success: boolean; error?: string; user?: UserData } {
  const users = getAllUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  
  if (!user) {
    return { success: false, error: 'Неверное имя пользователя или пароль' };
  }
  
  setCurrentUser(user);
  return { success: true, user };
}

export function logout(): void {
  setCurrentUser(null);
}

export function updateUserRating(userId: string, ratingDelta: number): void {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (user) {
    user.rating = Math.max(0, user.rating + ratingDelta);
    user.rank = getRankByRating(user.rating).name;
    saveUser(user);
  }
}
