import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { register, login } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AuthModal({ open, onOpenChange, onSuccess }: AuthModalProps) {
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleLogin = () => {
    if (!loginData.username || !loginData.password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    const result = login(loginData.username, loginData.password);
    
    if (result.success) {
      toast({
        title: 'Добро пожаловать!',
        description: `Вы успешно вошли как ${result.user?.username}`,
      });
      onOpenChange(false);
      onSuccess();
    } else {
      toast({
        title: 'Ошибка входа',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  const handleRegister = () => {
    if (!registerData.username || !registerData.email || !registerData.password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      return;
    }

    const result = register(registerData.username, registerData.email, registerData.password);
    
    if (result.success) {
      toast({
        title: 'Регистрация успешна!',
        description: `Добро пожаловать в Imperium, ${result.user?.username}!`,
      });
      onOpenChange(false);
      onSuccess();
    } else {
      toast({
        title: 'Ошибка регистрации',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Добро пожаловать в IMPERIUM</DialogTitle>
          <DialogDescription>Войдите или зарегистрируйтесь для продолжения</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <div>
              <Label>Имя пользователя</Label>
              <Input 
                placeholder="Введите имя пользователя" 
                className="mt-2"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div>
              <Label>Пароль</Label>
              <Input 
                type="password" 
                placeholder="Введите пароль" 
                className="mt-2"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              className="w-full gradient-purple hover-glow" 
              onClick={handleLogin}
            >
              Войти
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <div>
              <Label>Имя пользователя</Label>
              <Input 
                placeholder="Выберите имя пользователя" 
                className="mt-2"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="mt-2"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
            </div>
            <div>
              <Label>Пароль</Label>
              <Input 
                type="password" 
                placeholder="Минимум 6 символов" 
                className="mt-2"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </div>
            <div>
              <Label>Подтвердите пароль</Label>
              <Input 
                type="password" 
                placeholder="Повторите пароль" 
                className="mt-2"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              />
            </div>
            <Button 
              className="w-full gradient-purple hover-glow"
              onClick={handleRegister}
            >
              Зарегистрироваться
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
