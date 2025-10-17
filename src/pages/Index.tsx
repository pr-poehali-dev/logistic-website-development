import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [containerType, setContainerType] = useState('');
  const [weight, setWeight] = useState('');
  const [route, setRoute] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    cargoType: '',
    message: ''
  });

  const services = [
    {
      icon: 'Ship',
      title: 'Морские контейнерные перевозки',
      description: 'FCL и LCL перевозки по всему миру',
      features: ['20ft, 40ft, 40HC контейнеры', 'Рефрижераторные контейнеры', 'Специальное оборудование', 'Сборные грузы LCL']
    },
    {
      icon: 'Truck',
      title: 'Мультимодальные перевозки',
      description: 'Доставка от двери до двери',
      features: ['Комбинация видов транспорта', 'Оптимальные маршруты', 'Контроль на всех этапах', 'Страхование грузов']
    },
    {
      icon: 'Warehouse',
      title: 'Складская логистика',
      description: 'Хранение и обработка грузов',
      features: ['Временное хранение', 'Паллетирование', 'Упаковка и маркировка', 'Консолидация']
    },
    {
      icon: 'FileCheck',
      title: 'Таможенное оформление',
      description: 'Полное сопровождение ВЭД',
      features: ['Декларирование', 'Сертификация', 'Консультации по ВЭД', 'Документооборот']
    }
  ];

  const routes = [
    { from: 'Китай', to: 'Владивосток', time: '15-20 дней', ports: 'Шанхай, Нинбо, Гуанчжоу' },
    { from: 'Корея/Япония', to: 'Владивосток', time: '7-10 дней', ports: 'Пусан, Токио, Иокогама' },
    { from: 'Европа', to: 'Санкт-Петербург', time: '20-25 дней', ports: 'Роттердам, Гамбург, Антверпен' },
    { from: 'Скандинавия', to: 'Санкт-Петербург', time: '5-7 дней', ports: 'Хельсинки, Стокгольм, Гётеборг' },
    { from: 'Турция', to: 'Новороссийск', time: '7-10 дней', ports: 'Стамбул, Измир, Мерсин' },
    { from: 'Средиземноморье', to: 'Новороссийск', time: '10-15 дней', ports: 'Пирей, Генуя, Барселона' }
  ];

  const advantages = [
    { icon: 'TrendingUp', number: '15+', text: 'лет на рынке логистики' },
    { icon: 'Users', number: '500+', text: 'довольных клиентов' },
    { icon: 'Ship', number: '2000+', text: 'контейнеров в год' },
    { icon: 'CheckCircle', number: '98%', text: 'доставок в срок' }
  ];

  const calculatePrice = () => {
    if (containerType && weight && route) {
      const basePrice = containerType === '20ft' ? 85000 : containerType === '40ft' ? 145000 : containerType === '40hc' ? 155000 : 185000;
      const routeMultiplier = route === 'china' ? 1.0 : route === 'europe' ? 1.3 : route === 'turkey' ? 0.9 : 1.1;
      const total = basePrice * routeMultiplier;
      setCalculatedPrice(Math.round(total));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Наш менеджер свяжется с вами в течение 30 минут.",
    });
    setIsFormOpen(false);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      cargoType: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen">
      <header className="bg-primary text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-secondary rounded-lg p-2">
              <Icon name="Container" className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Формула Логистики</h1>
              <p className="text-sm text-white/80">Международные контейнерные перевозки</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#services" className="hover:text-secondary transition-colors">Услуги</a>
            <a href="#routes" className="hover:text-secondary transition-colors">Маршруты</a>
            <a href="#calculator" className="hover:text-secondary transition-colors">Калькулятор</a>
            <a href="#contact" className="hover:text-secondary transition-colors">Контакты</a>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="bg-secondary text-primary hover:bg-secondary/90 font-semibold">
                <Icon name="Phone" size={18} className="mr-2" />
                Заказать звонок
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Оставьте заявку</DialogTitle>
                <DialogDescription>
                  Заполните форму, и наш менеджер свяжется с вами в течение 30 минут
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Петров"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="ООО Торговый Дом"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargoType">Тип груза</Label>
                  <Input
                    id="cargoType"
                    value={formData.cargoType}
                    onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                    placeholder="Например: мебель, электроника"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Дополнительная информация</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Маршрут, сроки, особые требования..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Отправить заявку
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-secondary text-primary mb-6 text-sm px-4 py-2">
              <Icon name="Award" size={16} className="mr-2" />
              Надёжный партнёр с 2009 года
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Международные контейнерные перевозки по выгодным тарифам
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Доставка FCL и LCL грузов из Китая, Европы, Турции и других стран. 
              Работаем с ведущими морскими линиями. Гарантируем соблюдение сроков.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-semibold text-lg px-8">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                +7 (495) 123-45-67
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {advantages.map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon name={item.icon as any} className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{item.number}</div>
                <div className="text-muted-foreground">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">Наши услуги</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Комплексные логистические решения</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг для организации международных перевозок
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-2 border-2">
                <CardHeader>
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={28} />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={18} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="py-20 px-6 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-secondary text-primary mb-4">География работы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Основные направления перевозок</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Работаем с ведущими портами России и мира
            </p>
          </div>
          <div className="mb-12 relative">
            <img
              src="https://cdn.poehali.dev/projects/18f9c6ca-19d5-473e-96fd-a8382bf78ba0/files/47a9cc33-4d1d-434d-940b-6720d70ae5b5.jpg"
              alt="География перевозок"
              className="rounded-2xl shadow-2xl mx-auto max-w-5xl w-full"
            />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="flex items-center space-x-4 text-primary">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">Владивосток</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">Санкт-Петербург</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">Новороссийск</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-secondary text-primary font-semibold">{route.to}</Badge>
                    <Icon name="Ship" size={20} className="text-secondary" />
                  </div>
                  <CardTitle className="text-lg mb-2">
                    {route.from} → {route.to}
                  </CardTitle>
                  <CardDescription className="text-white/80 text-sm">
                    <div className="flex items-start space-x-2">
                      <Icon name="MapPin" size={14} className="mt-0.5 text-secondary flex-shrink-0" />
                      <span>{route.ports}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-secondary" />
                    <span className="text-sm font-medium">Срок доставки: {route.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary mb-4">Калькулятор</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Рассчитайте стоимость перевозки</h2>
            <p className="text-xl text-muted-foreground">
              Предварительный расчёт за 1 минуту
            </p>
          </div>
          <Card className="shadow-2xl border-2">
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="container">Тип контейнера</Label>
                  <Select onValueChange={setContainerType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип контейнера" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20ft">20ft стандартный</SelectItem>
                      <SelectItem value="40ft">40ft стандартный</SelectItem>
                      <SelectItem value="40hc">40ft High Cube</SelectItem>
                      <SelectItem value="reefer">Рефрижератор 40ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route-calc">Маршрут</Label>
                  <Select onValueChange={setRoute}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите направление" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="china">Китай → Владивосток</SelectItem>
                      <SelectItem value="europe">Европа → Санкт-Петербург</SelectItem>
                      <SelectItem value="turkey">Турция → Новороссийск</SelectItem>
                      <SelectItem value="korea">Корея → Владивосток</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <Label htmlFor="weight">Вес груза (тонн)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Введите вес груза"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <Button 
                onClick={calculatePrice} 
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                disabled={!containerType || !weight || !route}
              >
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
              {calculatedPrice && (
                <div className="mt-6 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Предварительная стоимость:</p>
                    <p className="text-4xl font-bold text-primary mb-4">
                      {calculatedPrice.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      * Итоговая стоимость зависит от характеристик груза и дополнительных услуг
                    </p>
                    <Button onClick={() => setIsFormOpen(true)} className="bg-secondary text-primary hover:bg-secondary/90">
                      Получить точный расчёт
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary mb-4">Преимущества</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="text-primary" size={32} />
                </div>
                <CardTitle>Прозрачные условия</CardTitle>
                <CardDescription>
                  Фиксированные ставки без скрытых платежей. Полный контроль бюджета.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headset" className="text-primary" size={32} />
                </div>
                <CardTitle>Персональный менеджер</CardTitle>
                <CardDescription>
                  Личный специалист на всех этапах перевозки. Всегда на связи 24/7.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Globe" className="text-primary" size={32} />
                </div>
                <CardTitle>Онлайн-трекинг</CardTitle>
                <CardDescription>
                  Отслеживайте местоположение груза в режиме реального времени.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FileCheck" className="text-primary" size={32} />
                </div>
                <CardTitle>Все документы</CardTitle>
                <CardDescription>
                  Берём на себя таможенное оформление и подготовку всей документации.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" className="text-primary" size={32} />
                </div>
                <CardTitle>Оперативность</CardTitle>
                <CardDescription>
                  Быстрая обработка заявок и оформление перевозки за 1-2 дня.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" className="text-primary" size={32} />
                </div>
                <CardTitle>Гарантии качества</CardTitle>
                <CardDescription>
                  Сертифицированная компания. Страхование грузов на всех этапах.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-secondary text-primary mb-6">Свяжитесь с нами</Badge>
              <h2 className="text-4xl font-bold mb-6">Готовы начать работу?</h2>
              <p className="text-xl opacity-90 mb-8">
                Получите консультацию специалиста и индивидуальное коммерческое предложение
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-secondary/20 p-3 rounded-full">
                    <Icon name="Phone" className="text-secondary" size={24} />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Телефон</div>
                    <div className="text-xl font-semibold">+7 (495) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-secondary/20 p-3 rounded-full">
                    <Icon name="Mail" className="text-secondary" size={24} />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Email</div>
                    <div className="text-xl font-semibold">info@formula-logistics.ru</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-secondary/20 p-3 rounded-full">
                    <Icon name="MapPin" className="text-secondary" size={24} />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Офис</div>
                    <div className="text-xl font-semibold">Москва, ул. Морская, д. 15</div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Оставьте заявку</CardTitle>
                <CardDescription>Ответим в течение 30 минут</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Ваше имя *</Label>
                    <Input
                      id="contact-name"
                      required
                      placeholder="Иван Петров"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Телефон *</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="ivan@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Опишите ваш груз и маршрут..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary/95 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-secondary rounded-lg p-2">
                  <Icon name="Container" className="text-primary" size={24} />
                </div>
                <span className="font-bold text-xl">Формула Логистики</span>
              </div>
              <p className="text-white/70 text-sm">
                Надёжный партнёр в международных контейнерных перевозках с 2009 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Морские перевозки</li>
                <li>Таможенное оформление</li>
                <li>Складская логистика</li>
                <li>Мультимодальные перевозки</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Направления</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Китай - Россия</li>
                <li>Европа - Россия</li>
                <li>Турция - Россия</li>
                <li>Корея - Россия</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>+7 (495) 123-45-67</li>
                <li>info@formula-logistics.ru</li>
                <li>Москва, ул. Морская, д. 15</li>
                <li>Пн-Пт: 9:00 - 18:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
            <p>© 2024 Формула Логистики. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
