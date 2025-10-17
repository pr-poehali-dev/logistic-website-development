import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');
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
    cargoWeight: '',
    routeFrom: '',
    routeTo: '',
    additionalInfo: ''
  });

  const services = [
    {
      icon: 'Ship',
      title: 'Морские перевозки',
      description: 'Контейнерные перевозки FCL и LCL по всему миру',
      features: ['20ft и 40ft контейнеры', 'Рефрижераторные контейнеры', 'Спецгрузы']
    },
    {
      icon: 'Plane',
      title: 'Авиаперевозки',
      description: 'Экспресс-доставка грузов авиатранспортом',
      features: ['Срочные грузы', 'Температурный режим', 'Таможенное оформление']
    },
    {
      icon: 'Truck',
      title: 'Автоперевозки',
      description: 'Доставка от двери до двери по России и СНГ',
      features: ['FTL и LTL', 'Мультимодальные перевозки', 'Складская логистика']
    },
    {
      icon: 'FileText',
      title: 'Таможенное оформление',
      description: 'Полное сопровождение таможенных процедур',
      features: ['Декларирование', 'Консультации', 'Документооборот']
    }
  ];

  const routes = [
    { from: 'Китай', to: 'Россия', time: '25-30 дней', ports: 'Шанхай → Владивосток' },
    { from: 'Европа', to: 'Россия', time: '20-25 дней', ports: 'Роттердам → Санкт-Петербург' },
    { from: 'Турция', to: 'Россия', time: '15-20 дней', ports: 'Стамбул → Новороссийск' },
    { from: 'США', to: 'Россия', time: '35-40 дней', ports: 'Лос-Анджелес → Владивосток' }
  ];

  const certificates = [
    'ISO 9001:2015 - Система менеджмента качества',
    'ISO 14001:2015 - Экологический менеджмент',
    'FIATA - Международная федерация экспедиторов',
    'Лицензия таможенного представителя',
    'Сертификат безопасности цепи поставок'
  ];

  const calculatePrice = () => {
    if (containerType && weight && route) {
      const basePrice = containerType === '20ft' ? 1500 : 2500;
      const weightFactor = parseFloat(weight) * 10;
      const routeMultiplier = route === 'china' ? 1.0 : route === 'europe' ? 1.2 : 1.1;
      const total = (basePrice + weightFactor) * routeMultiplier;
      setCalculatedPrice(Math.round(total));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Наш менеджер свяжется с вами в ближайшее время.",
    });
    setIsFormOpen(false);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      cargoType: '',
      cargoWeight: '',
      routeFrom: '',
      routeTo: '',
      additionalInfo: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Box" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">Формула Логистики</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {['Главная', 'Услуги', 'География', 'О компании', 'Тарифы', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className="text-sm font-medium hover:text-accent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Связаться
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in">
              <Badge className="bg-accent text-white">Международные перевозки с 2010 года</Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Контейнерные перевозки
                <span className="text-accent block mt-2">по всему миру</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Надежная доставка грузов морским транспортом. Оптимальные маршруты, прозрачные тарифы, полное таможенное сопровождение.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Icon name="Calculator" size={18} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="FileText" size={18} className="mr-2" />
                  Наши документы
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">лет опыта</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">стран доставки</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">2000+</div>
                  <div className="text-sm text-muted-foreground">клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/18f9c6ca-19d5-473e-96fd-a8382bf78ba0/files/54ff697c-b4dd-4a54-a46b-9f7cc17337ca.jpg"
                alt="Контейнерные перевозки"
                className="rounded-2xl shadow-2xl hover-scale"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Icon name="TrendingUp" className="text-accent" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">доставок в срок</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">Комплексные решения для вашего бизнеса</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-scale border-2 hover:border-accent transition-all">
                <CardHeader>
                  <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-accent" size={28} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Icon name="Check" className="text-secondary mt-1" size={16} />
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

      <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">География перевозок</h2>
            <p className="text-xl opacity-90">Основные направления и маршруты</p>
          </div>
          <div className="mb-12">
            <img
              src="https://cdn.poehali.dev/projects/18f9c6ca-19d5-473e-96fd-a8382bf78ba0/files/bfd4af17-9431-45cb-90af-7975f84c9637.jpg"
              alt="География перевозок"
              className="rounded-2xl shadow-2xl mx-auto max-w-4xl"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{route.from}</span>
                    <Icon name="ArrowRight" size={20} />
                    <span>{route.to}</span>
                  </CardTitle>
                  <CardDescription className="text-white/70">{route.ports}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-secondary" />
                    <span className="text-sm font-medium">{route.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Калькулятор стоимости</h2>
            <p className="text-xl text-muted-foreground">Рассчитайте стоимость перевозки за 30 секунд</p>
          </div>
          <Card className="shadow-xl">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="container">Тип контейнера</Label>
                  <Select onValueChange={setContainerType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20ft">20ft стандартный</SelectItem>
                      <SelectItem value="40ft">40ft стандартный</SelectItem>
                      <SelectItem value="40hc">40ft High Cube</SelectItem>
                      <SelectItem value="reefer">Рефрижератор</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Вес груза (тонн)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Введите вес"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Маршрут</Label>
                  <Select onValueChange={setRoute}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите маршрут" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="china">Китай → Россия</SelectItem>
                      <SelectItem value="europe">Европа → Россия</SelectItem>
                      <SelectItem value="turkey">Турция → Россия</SelectItem>
                      <SelectItem value="usa">США → Россия</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Дополнительные услуги</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-white transition-colors">
                      Страхование
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-white transition-colors">
                      Таможня
                    </Badge>
                  </div>
                </div>
              </div>
              <Button onClick={calculatePrice} className="w-full bg-accent hover:bg-accent/90" size="lg">
                <Icon name="Calculator" size={18} className="mr-2" />
                Рассчитать стоимость
              </Button>
              {calculatedPrice && (
                <div className="mt-6 p-6 bg-accent/10 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-2">Ориентировочная стоимость</div>
                  <div className="text-4xl font-bold text-accent">${calculatedPrice.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground mt-2">Точную стоимость уточняйте у менеджера</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">О компании</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  <strong className="text-primary">Формула Логистики</strong> — надежный партнер в сфере международных контейнерных перевозок с 2010 года.
                </p>
                <p>
                  Мы специализируемся на морских перевозках грузов по всему миру, предлагая оптимальные решения для бизнеса любого масштаба.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" className="text-accent" size={24} />
                    <span className="font-medium">Полное страхование</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" className="text-accent" size={24} />
                    <span className="font-medium">Доставка в срок</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" className="text-accent" size={24} />
                    <span className="font-medium">Личный менеджер</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Award" className="text-accent" size={24} />
                    <span className="font-medium">Сертификаты ISO</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Документы и сертификаты</h3>
              <Accordion type="single" collapsible className="w-full">
                {certificates.map((cert, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-3">
                        <Icon name="FileCheck" className="text-secondary" size={20} />
                        <span>{cert}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Документ подтверждает соответствие международным стандартам качества и безопасности.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-accent to-accent/90 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы начать сотрудничество?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами для расчета стоимости и обсуждения деталей вашей перевозки
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <Icon name="Phone" size={32} className="mx-auto mb-3" />
              <div className="font-semibold mb-1">Телефон</div>
              <div className="opacity-90">+7 (495) 123-45-67</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <Icon name="Mail" size={32} className="mx-auto mb-3" />
              <div className="font-semibold mb-1">Email</div>
              <div className="opacity-90">info@formula-log.ru</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <Icon name="MapPin" size={32} className="mx-auto mb-3" />
              <div className="font-semibold mb-1">Офис</div>
              <div className="opacity-90">Москва, Пресненская наб.</div>
            </div>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary">
                <Icon name="Send" size={18} className="mr-2" />
                Отправить заявку
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Заявка на расчет стоимости</DialogTitle>
                <DialogDescription>
                  Заполните форму и мы свяжемся с вами в течение 30 минут
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Компания</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="ООО Рога и Копыта"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cargoType">Тип груза *</Label>
                    <Select required onValueChange={(value) => setFormData({...formData, cargoType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Генеральные грузы</SelectItem>
                        <SelectItem value="container-20">Контейнер 20ft</SelectItem>
                        <SelectItem value="container-40">Контейнер 40ft</SelectItem>
                        <SelectItem value="reefer">Рефрижератор</SelectItem>
                        <SelectItem value="oversized">Негабаритный груз</SelectItem>
                        <SelectItem value="dangerous">Опасный груз</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargoWeight">Вес груза (тонн) *</Label>
                    <Input
                      id="cargoWeight"
                      type="number"
                      required
                      value={formData.cargoWeight}
                      onChange={(e) => setFormData({...formData, cargoWeight: e.target.value})}
                      placeholder="10"
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="routeFrom">Откуда *</Label>
                    <Input
                      id="routeFrom"
                      required
                      value={formData.routeFrom}
                      onChange={(e) => setFormData({...formData, routeFrom: e.target.value})}
                      placeholder="Шанхай, Китай"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routeTo">Куда *</Label>
                    <Input
                      id="routeTo"
                      required
                      value={formData.routeTo}
                      onChange={(e) => setFormData({...formData, routeTo: e.target.value})}
                      placeholder="Москва, Россия"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Дополнительная информация</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                    placeholder="Укажите дополнительные требования: упаковка, страхование, срочность доставки и т.д."
                    rows={4}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" className="text-accent mt-0.5" size={20} />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Что дальше?</p>
                      <ul className="space-y-1">
                        <li>• Менеджер свяжется с вами в течение 30 минут</li>
                        <li>• Уточнит детали и предложит оптимальный маршрут</li>
                        <li>• Подготовит коммерческое предложение</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить заявку
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Отмена
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <footer className="bg-primary text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Box" size={28} />
                <span className="text-xl font-bold">Формула Логистики</span>
              </div>
              <p className="text-sm opacity-80">Международные контейнерные перевозки с 2010 года</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Морские перевозки</li>
                <li>Авиаперевозки</li>
                <li>Автоперевозки</li>
                <li>Таможенное оформление</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>О нас</li>
                <li>Документы</li>
                <li>Вакансии</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>+7 (495) 123-45-67</li>
                <li>info@formula-log.ru</li>
                <li>Москва, Пресненская наб.</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
            © 2024 Формула Логистики. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;