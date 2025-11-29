import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout, updateUserRating, getAllUsers } from '@/lib/auth';

interface ConsoleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Windows11Console({ open, onOpenChange }: ConsoleProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ text: string; type: 'command' | 'output' | 'error' }[]>([
    { text: 'Imperium Console [Version 1.0.0]', type: 'output' },
    { text: '(c) Imperium Corporation. Все права защищены.', type: 'output' },
    { text: '', type: 'output' },
    { text: 'Введите "help" для списка команд', type: 'output' },
    { text: '', type: 'output' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const newHistory = [...history, { text: `> ${trimmedCmd}`, type: 'command' as const }];
    const parts = trimmedCmd.toLowerCase().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    const user = getCurrentUser();

    switch (command) {
      case 'help':
        newHistory.push(
          { text: '', type: 'output' },
          { text: 'Доступные команды:', type: 'output' },
          { text: '  help           - Показать список команд', type: 'output' },
          { text: '  clear          - Очистить консоль', type: 'output' },
          { text: '  whoami         - Показать текущего пользователя', type: 'output' },
          { text: '  status         - Показать статистику', type: 'output' },
          { text: '  users          - Список всех пользователей', type: 'output' },
          { text: '  addrating <N>  - Добавить рейтинг (тест)', type: 'output' },
          { text: '  logout         - Выйти из аккаунта', type: 'output' },
          { text: '  exit           - Закрыть консоль', type: 'output' },
          { text: '', type: 'output' }
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'whoami':
        if (user) {
          newHistory.push(
            { text: '', type: 'output' },
            { text: `Пользователь: ${user.username}`, type: 'output' },
            { text: `ID: ${user.id}`, type: 'output' },
            { text: `Email: ${user.email}`, type: 'output' },
            { text: `Ранг: ${user.rank}`, type: 'output' },
            { text: '', type: 'output' }
          );
        } else {
          newHistory.push({ text: 'Вы не авторизованы', type: 'error' });
        }
        break;

      case 'status':
        if (user) {
          newHistory.push(
            { text: '', type: 'output' },
            { text: `=== Статистика ${user.username} ===`, type: 'output' },
            { text: `Рейтинг: ${user.rating}`, type: 'output' },
            { text: `Постов: ${user.posts}`, type: 'output' },
            { text: `Комментариев: ${user.comments}`, type: 'output' },
            { text: `Ранг: ${user.rank}`, type: 'output' },
            { text: `Дата регистрации: ${new Date(user.joinDate).toLocaleDateString('ru-RU')}`, type: 'output' },
            { text: '', type: 'output' }
          );
        } else {
          newHistory.push({ text: 'Вы не авторизованы', type: 'error' });
        }
        break;

      case 'users':
        const users = getAllUsers();
        if (users.length > 0) {
          newHistory.push({ text: '', type: 'output' });
          newHistory.push({ text: `Всего пользователей: ${users.length}`, type: 'output' });
          newHistory.push({ text: '', type: 'output' });
          users.forEach((u, i) => {
            newHistory.push({ 
              text: `${i + 1}. ${u.username} - ${u.rank} (Рейтинг: ${u.rating})`, 
              type: 'output' 
            });
          });
          newHistory.push({ text: '', type: 'output' });
        } else {
          newHistory.push({ text: 'Нет зарегистрированных пользователей', type: 'output' });
        }
        break;

      case 'addrating':
        if (!user) {
          newHistory.push({ text: 'Вы не авторизованы', type: 'error' });
        } else {
          const amount = parseInt(args[0]);
          if (isNaN(amount)) {
            newHistory.push({ text: 'Использование: addrating <число>', type: 'error' });
          } else {
            updateUserRating(user.id, amount);
            const updatedUser = getCurrentUser();
            newHistory.push({ 
              text: `Рейтинг изменен на ${amount}. Новый рейтинг: ${updatedUser?.rating}`, 
              type: 'output' 
            });
          }
        }
        break;

      case 'logout':
        if (user) {
          logout();
          newHistory.push({ text: 'Вы вышли из аккаунта', type: 'output' });
          setTimeout(() => window.location.reload(), 1000);
        } else {
          newHistory.push({ text: 'Вы не авторизованы', type: 'error' });
        }
        break;

      case 'exit':
        onOpenChange(false);
        return;

      default:
        newHistory.push({ 
          text: `'${command}' не является внутренней или внешней командой. Введите 'help' для справки.`, 
          type: 'error' 
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[600px] p-0 bg-[#0c0c0c] border-none overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-[#2d2d2d]">
            <div className="flex items-center gap-2">
              <Icon name="Terminal" size={16} className="text-white" />
              <span className="text-sm text-white font-semibold">Imperium Console</span>
            </div>
            <button 
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/10 p-1 rounded"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          <div 
            ref={historyRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-sm"
            style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
          >
            {history.map((item, index) => (
              <div 
                key={index}
                className={
                  item.type === 'command' ? 'text-yellow-400' :
                  item.type === 'error' ? 'text-red-400' :
                  'text-gray-300'
                }
              >
                {item.text}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-400">C:\Imperium&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    executeCommand(input);
                  }
                }}
                className="flex-1 bg-transparent outline-none text-white caret-white"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
